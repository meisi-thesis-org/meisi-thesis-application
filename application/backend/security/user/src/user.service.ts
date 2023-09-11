import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type UserEntity, type UserDTO, userMapper } from './structs/user.domain';
import { type UpdateUserAccessCodeRequest, type CreateUserRequest, type FindUserByUuidRequest, type UpdateUserByUuidRequest, type FindUserByAccessCodeRequest } from './structs/user.request';
import { type UserRepository } from './user.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { HashProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/hash.provider';
import { UserStateRepository } from './repositories/user-state.repository';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';

export class UserService {
  private readonly userRepository: UserRepository = new UserStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly hashProvider: HashProvider = new HashProvider();
  private readonly queueProvider: QueueProvider = new QueueProvider();

  private async sendEmailQueue (
    path: string,
    props: {
      toEmail: string
      subject: string
      content: string
    }
  ): Promise<void> {
    const message = {
      routeURL: path,
      correlationUuid: this.randomProvider.randomUUID(),
      ...props
    }

    await this.queueProvider
      .sendQueue(
        process.env.RABBITMQ_URL ?? 'amqp://localhost',
        'create_email',
        Buffer.from(JSON.stringify(message))
      )
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
      firstName: '',
      lastName: '',
      dateBirth: '',
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
      firstName: updateUserByUuidRequest.firstName ?? foundUser.firstName,
      lastName: updateUserByUuidRequest.lastName ?? foundUser.lastName,
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
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
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
