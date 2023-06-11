import { ConflictException } from '../../../../shared/src/exceptions/conflict.exception';
import { InternalServerException } from '../../../../shared/src/exceptions/internal-server.exception';
import { NotFoundException } from '../../../../shared/src/exceptions/not-found.exception';
import { type RandomStringEncoderProvider } from '../../../../shared/src/providers/random-string-encoder.provider';
import { type RandomStringProvider } from '../../../../shared/src/providers/random-string.provider';
import { type UuidProvider } from '../../../../shared/src/providers/uuid.provider';
import { SecurityConfiguration } from '../../security.configuration';
import { UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { UserMockRepository } from './repositories/user-mock.repository';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly _repository: UserRepository = new UserMockRepository();
  private readonly _userDTOMapper: UserDTOMapper = new UserDTOMapper();
  private readonly _uuidProvider: UuidProvider = SecurityConfiguration.instance.uuidProvider;
  private readonly _randomStringProvider: RandomStringProvider = SecurityConfiguration.instance.randomStringProvider
  private readonly _randomStringEncoderProvider: RandomStringEncoderProvider = SecurityConfiguration.instance.randomStringEncoderProvider

  public async fetchUser(userUuid: string): Promise<UserDTO> {
    const user = await this._repository.findOneByUuid(userUuid).catch(() => {
      throw new InternalServerException();
    });

    if (user === null || user === undefined) {
      throw new NotFoundException();
    }

    return this._userDTOMapper.apply(user);
  }

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this._repository.findByAuthCredentials(
      signUpRequest.username,
      signUpRequest.email,
      signUpRequest.phoneNumber
    ).catch(() => {
      throw new InternalServerException();
    });

    if (foundUser !== null && foundUser !== undefined) {
      throw new ConflictException();
    }

    const generatedPassword = this._randomStringProvider.generate(12);
    const encodedPassword = await this._randomStringEncoderProvider
      .hash(generatedPassword, 10)
      .catch(() => { throw new InternalServerException(); });

    const createdUser = new UserEntity(
      this._uuidProvider.randomUuid(),
      signUpRequest.username,
      signUpRequest.email,
      signUpRequest.phoneNumber,
      signUpRequest.firstName,
      signUpRequest.lastName,
      signUpRequest.dateBirth,
      encodedPassword,
      '',
      '',
      false,
      false,
      false
    );

    await this._repository.save(createdUser).catch(() => {
      throw new InternalServerException();
    });

    // TODO: Send Email

    return this._userDTOMapper.apply(createdUser);
  }
}
