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

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;
  private readonly randomProvider: RandomProvider;
  private readonly hashProvider: HashProvider;

  public constructor () {
    this.userRepository = new UserStateRepository();
    this.userMapper = new UserMapper();
    this.randomProvider = new RandomProvider();
    this.hashProvider = new HashProvider();
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

    const randomString = this.randomProvider.randomString(64);
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

    // TODO: Call RabbitMQ Service (SendEmail)

    return this.userMapper.map(createdUser);
  }
}
