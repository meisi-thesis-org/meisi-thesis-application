import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { type UserDTO } from './domain/user.domain';
import { UserStateRepository } from './repositories/user-state.repository';
import { type FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { type UserRepository } from './user.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { UserMapper } from './domain/user.mapper';
import { type SignUpRequest } from './requests/sign-up.request';
import { ConflictException } from '@meisi-thesis/application-backend-shared/src/exceptions/conflict.exception';
import { UserEntity } from './domain/user.entity';
import { RandomProvider } from '@meisi-thesis/application-backend-shared/src/providers/random.provider';
import { HashProvider } from '@meisi-thesis/application-backend-shared/src/providers/hash.provider';
import { QueueProvider } from '@meisi-thesis/application-backend-shared/src/providers/queue.provider';
import { type SignInRequest } from './requests/sign-in.request';
import { type RefreshAccessCodeRequest } from './requests/refresh-access-code.request';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;
  private readonly randomProvider: RandomProvider;
  private readonly hashProvider: HashProvider;
  private readonly queueProvider: QueueProvider;

  public constructor () {
    this.userRepository = new UserStateRepository();
    this.userMapper = new UserMapper();
    this.randomProvider = new RandomProvider();
    this.hashProvider = new HashProvider();
    this.queueProvider = new QueueProvider();
  }

  public async findUserByUuid (findUserByUuidRequest: FindUserByUuidRequest): Promise<UserDTO> {
    const user = await this.userRepository
      .findOneByUuid(findUserByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (user === undefined) throw new NonFoundException();

    return this.userMapper.map(user);
  }

  public async signUp (signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository
      .findUserByCredentials(
        signUpRequest.getUsername(),
        signUpRequest.getEmail(),
        signUpRequest.getPhoneNumber()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (foundUser !== undefined) throw new ConflictException();

    const randomString = this.randomProvider.randomString(12);
    console.log(randomString);
    const randomHash = await this.hashProvider.hash(randomString).catch(() => {
      throw new InternalServerException();
    });

    const createdUser = new UserEntity(
      this.randomProvider.randomUUID(),
      signUpRequest.getEmail(),
      signUpRequest.getUsername(),
      signUpRequest.getPhoneNumber(),
      randomHash,
      '',
      '',
      '',
      new Date().toISOString(),
      new Date().toISOString()
    );

    await this.userRepository.createOne(createdUser).catch(() => {
      throw new InternalServerException();
    });

    // await this.queueProvider.sendQueue(
    //   process.env.RABBITMQ_URL ?? 'amqp://localhost',
    //   'create_email',
    //   Buffer.from(JSON.stringify({
    //     routeURL: '/security/users/sign-up',
    //     correlationUuid: this.randomProvider.randomUUID(),
    //     toEmail: createdUser.getEmail(),
    //     subject: 'Created Account',
    //     content: `Welcome! Your access code is ${randomString}!`
    //   }))
    // )

    return this.userMapper.map(createdUser);
  }

  public async signIn (signInRequest: SignInRequest): Promise<UserDTO> {
    const foundUsers = await this.userRepository.findBulk().catch(() => {
      throw new InternalServerException();
    })

    for (const foundUser of foundUsers) {
      const isAccessCodeEqual = await this.hashProvider.compare(
        signInRequest.getAccessCode(),
        foundUser.getAccessCode()
      )

      if (isAccessCodeEqual === true) {
        return this.userMapper.map(foundUser);
      }
    }

    throw new NonFoundException()
  }

  public async refreshAccessCode (refreshAccessCode: RefreshAccessCodeRequest): Promise<UserDTO> {
    throw new Error();
  }
}
