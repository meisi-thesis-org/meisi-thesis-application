import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type UserEntity, type UserDTO, userMapper } from './structs/user.domain';
import { type UpdateUserAccessCodeRequest, type CreateUserRequest, type FindUserByUuidRequest, type UpdateUserByUuidRequest, type FindUserByAccessCodeRequest } from './structs/user.request';
import { type UserRepository } from './user.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { HashProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/hash.provider';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { UserStateRepository } from './repositories/user-state.repository';

export class UserService {
  private readonly userRepository: UserRepository = new UserStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly hashProvider: HashProvider = new HashProvider();
  private readonly queueProvider: QueueProvider = new QueueProvider();

  private async sendEmailQueue (
    routeURL: string,
    props: {
      toEmail: string
      subject: string
      content: string
    }
  ): Promise<void> {
    const dispatcherQueueActive = process.env.DISPATCHER_QUEUE_ACTIVE

    if (dispatcherQueueActive === undefined || dispatcherQueueActive === 'false') {
      return;
    }

    const correlationUuid = this.randomProvider.randomUUID()
    const providerHost = process.env.RABBITMQ_URL ?? 'amqp://localhost'
    const bufferedMessage = Buffer.from(JSON.stringify({ routeURL, correlationUuid, ...props }))

    await this.queueProvider
      .sendQueue(providerHost, 'create_email', bufferedMessage)
      .catch(() => { throw new InternalServerException() });
  }

  public async findUserByUuid (findUserByUuidRequest: FindUserByUuidRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository
      .findUserByUuid(findUserByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundUser === undefined) throw new NonFoundException();

    return userMapper(foundUser);
  }

  public async createUser (createUserRequest: CreateUserRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository
      .findUserByAuthCredentials(
        createUserRequest.username,
        createUserRequest.email,
        createUserRequest.phoneNumber
      ).catch(() => {
        throw new InternalServerException()
      });

    if (foundUser !== undefined) throw new ConflictException();

    const randomAccessCode = this.randomProvider.randomString(16);
    const randomHashedAccessCode = await this.hashProvider.hash(randomAccessCode).catch(() => {
      throw new InternalServerException()
    });

    console.log(randomAccessCode)

    const createdUser: UserEntity = {
      uuid: this.randomProvider.randomUUID(),
      username: createUserRequest.username,
      email: createUserRequest.email,
      phoneNumber: createUserRequest.phoneNumber,
      accessCode: randomHashedAccessCode,
      name: createUserRequest.name,
      dateBirth: createUserRequest.dateBirth,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await this.userRepository.createUser(createdUser).catch(() => {
      throw new InternalServerException()
    });

    await this.sendEmailQueue('security.users::createUser',
      {
        toEmail: createdUser.email,
        subject: 'Created Account',
        content: `Welcome. Your access code is ${randomAccessCode}!`
      }
    );

    return userMapper(createdUser);
  }

  public async updateUserByUuid (updateUserByUuidRequest: UpdateUserByUuidRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository
      .findUserByUuid(updateUserByUuidRequest.uuid)
      .catch(() => { throw new InternalServerException() });

    if (foundUser === undefined) throw new NonFoundException();

    const updatedUser: UserEntity = {
      uuid: foundUser.uuid,
      username: updateUserByUuidRequest.username ?? foundUser.username,
      email: updateUserByUuidRequest.email ?? foundUser.email,
      phoneNumber: updateUserByUuidRequest.phoneNumber ?? foundUser.phoneNumber,
      accessCode: foundUser.accessCode,
      name: updateUserByUuidRequest.name ?? foundUser.name,
      dateBirth: updateUserByUuidRequest.dateBirth ?? foundUser.dateBirth,
      createdAt: foundUser.createdAt,
      updatedAt: new Date().toISOString()
    }

    await this.userRepository
      .updateUser(updatedUser)
      .catch(() => { throw new InternalServerException() });

    return userMapper(updatedUser);
  }

  public async updateUserAccessCode (updateUserAccessCodeRequest: UpdateUserAccessCodeRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository
      .findUserByAuthCredentials(
        updateUserAccessCodeRequest.username,
        updateUserAccessCodeRequest.email,
        updateUserAccessCodeRequest.phoneNumber
      )
      .catch(() => { throw new InternalServerException() });

    if (foundUser === undefined) throw new NonFoundException();

    const randomAccessCode = this.randomProvider.randomString(16);
    const randomHashedAccessCode = await this.hashProvider.hash(randomAccessCode).catch(() => {
      throw new InternalServerException()
    });

    const updatedUser: UserEntity = {
      uuid: foundUser.uuid,
      username: foundUser.username,
      email: foundUser.email,
      phoneNumber: foundUser.phoneNumber,
      accessCode: randomHashedAccessCode,
      name: foundUser.name,
      dateBirth: foundUser.dateBirth,
      createdAt: foundUser.createdAt,
      updatedAt: new Date().toISOString()
    }

    await this.userRepository
      .updateUser(updatedUser)
      .catch(() => { throw new InternalServerException() });

    await this.sendEmailQueue('security.users::createUser',
      {
        toEmail: updatedUser.email,
        subject: 'Created Account',
        content: `Welcome. Your access code is ${randomAccessCode}!`
      }
    );

    return userMapper(updatedUser);
  }

  public async findUserByAccessCode (findUserByAccessCodeRequest: FindUserByAccessCodeRequest): Promise<UserDTO> {
    const foundUsers = await this.userRepository
      .findBulk()
      .catch(() => { throw new InternalServerException() });

    for (const foundUser of foundUsers as UserEntity[]) {
      const comparedPassword = await this.hashProvider.compare(
        findUserByAccessCodeRequest.accessCode, foundUser.accessCode
      )

      if (comparedPassword) {
        return userMapper(foundUser)
      }
    }

    throw new NonFoundException()
  }
}
