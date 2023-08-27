import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { type UserDTO } from './domain/user.dto';
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
import { TokenProvider } from './providers/token.provider';
import { BadRequestException } from '@meisi-thesis/application-backend-shared/src/exceptions/bad-request.exception';
import { type SignOutRequest } from './requests/sign-out.request';
import { type RefreshTokensRequest } from './requests/refresh-tokens.request';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;
  private readonly randomProvider: RandomProvider;
  private readonly hashProvider: HashProvider;
  private readonly queueProvider: QueueProvider;
  private readonly tokenProvider: TokenProvider;

  public constructor () {
    this.userRepository = new UserStateRepository();
    this.userMapper = new UserMapper();
    this.randomProvider = new RandomProvider();
    this.hashProvider = new HashProvider();
    this.queueProvider = new QueueProvider();
    this.tokenProvider = new TokenProvider();
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

      if (isAccessCodeEqual) {
        const payload = {
          uuid: foundUser.getUuid(),
          username: foundUser.getUsername(),
          email: foundUser.getEmail(),
          phoneNumber: foundUser.getPhoneNumber()
        }

        const accessToken = this.tokenProvider.sign(payload, process.env.ACCESS_TOKEN_SECRET, '1h');
        const refreshToken = this.tokenProvider.sign(payload, process.env.REFRESH_TOKEN_SECRET, '1d');

        const hashedAccessToken = await this.hashProvider.hash(accessToken);
        const hashedRefreshToken = await this.hashProvider.hash(refreshToken);

        await this.userRepository
          .updateTokens(foundUser.getUuid(), hashedAccessToken, hashedRefreshToken)
          .catch(() => {
            throw new InternalServerException();
          });

        foundUser.setAccessToken(accessToken);
        foundUser.setRefreshToken(refreshToken);

        return this.userMapper.map(foundUser)
      };
    }

    throw new BadRequestException()
  }

  public async refreshAccessCode (refreshAccessCode: RefreshAccessCodeRequest): Promise<UserDTO> {
    const user = await this.userRepository
      .findUserByCredentials(
        refreshAccessCode.getUsername(),
        refreshAccessCode.getEmail(),
        refreshAccessCode.getPhoneNumber()
      ).catch(() => {
        throw new InternalServerException();
      })

    if (user === undefined) throw new NonFoundException();

    const accessCode = this.randomProvider.randomString(12);
    const hashedAccessCode = await this.hashProvider.hash(accessCode)

    const updatedUser = await this.userRepository
      .updateAccessCode(user.getUuid(), hashedAccessCode)
      .catch(() => {
        throw new InternalServerException();
      })

    if (updatedUser === undefined) throw new NonFoundException();

    return this.userMapper.map(updatedUser);
  }

  public async signOut (signOutRequest: SignOutRequest): Promise<UserDTO> {
    const user = await this.userRepository
      .findOneByUuid(signOutRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (user === undefined) throw new NonFoundException();

    const updatedUser = await this.userRepository
      .updateTokens(user.getUuid(), '', '')
      .catch(() => {
        throw new InternalServerException();
      })

    if (updatedUser === undefined) throw new NonFoundException();

    return this.userMapper.map(user);
  }

  public async refreshTokens (refreshTokensRequest: RefreshTokensRequest): Promise<UserDTO> {
    const user = await this.userRepository
      .findOneByUuid(refreshTokensRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (user === undefined) throw new NonFoundException();

    const payload = {
      uuid: user.getUuid(),
      username: user.getUsername(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber()
    }

    const accessToken = this.tokenProvider.sign(payload, process.env.ACCESS_TOKEN_SECRET, '1h');
    const refreshToken = this.tokenProvider.sign(payload, process.env.REFRESH_TOKEN_SECRET, '1d');

    const hashedAccessToken = await this.hashProvider.hash(accessToken);
    const hashedRefreshToken = await this.hashProvider.hash(refreshToken);

    const updatedUser = await this.userRepository
      .updateTokens(user.getUuid(), hashedAccessToken, hashedRefreshToken)
      .catch(() => {
        throw new InternalServerException();
      })

    if (updatedUser === undefined) throw new NonFoundException();

    return this.userMapper.map(user);
  }
}
