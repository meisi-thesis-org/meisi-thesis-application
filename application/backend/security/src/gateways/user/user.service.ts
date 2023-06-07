import { AlreadyExistsResourceException } from '../../../../shared/src/exceptions/already-exists-resource.exception';
import { NonFoundResourceException } from '../../../../shared/src/exceptions/non-found-resource.exception';
import { type UuidProvider } from '../../../../shared/src/providers/uuid.provider';
import { SecurityConfiguration } from '../../security.configuration';
import { type UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { type RefreshCodeRequest } from './requests/refresh-code.request';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly _userDTOMapper: UserDTOMapper = SecurityConfiguration.instance.userDTOMapper;
  private readonly _uuidProvider: UuidProvider = SecurityConfiguration.instance.uuidProvider;
  private readonly _userDTOMapper: UserDTOMapper = SecurityConfiguration.instance.userDTOMapper;

  public constructor(
    private readonly _repository: UserRepository
  ) {}

  public async fetchUser(uuid: string): Promise<UserDTO> {
    const user = await this._repository.fetchOneByUuid(uuid);

    if (!user) {
      throw new NonFoundResourceException();
    }

    return this._userDTOMapper.apply(user);
  }

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this._repository.fetchByAuthCredentials(
      signUpRequest.username,
      signUpRequest.email,
      signUpRequest.phoneNumber
    );

    if (foundUser) {
      throw new AlreadyExistsResourceException();
    }

    const createdUser = new UserEntity(
      this._uuidProvider.v4(),
      signUpRequest.username,
      signUpRequest.email,
      signUpRequest.phoneNumber,
      signUpRequest.firstName,
      signUpRequest.lastName,
      signUpRequest.dateBirth,
      SecurityConfiguration.instance.randomStringProvider.generate(12),
      '',
      '',
      false,
      false,
      false
    );

    await this._repository.save(createdUser)
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async signOut(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async refreshCode(refreshCode: RefreshCodeRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async refreshToken(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async block(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async unblock(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async deactivate(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async activate(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async acceptPrivacyTerms(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async refusePrivacyTerms(uuid: string): Promise<UserDTO> {
    throw new Error();
  }
}
