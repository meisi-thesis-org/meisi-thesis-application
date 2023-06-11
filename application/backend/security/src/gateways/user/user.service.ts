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
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';
import { type RandomTokenProvider } from '../../../../shared/src/providers/random-token.provider';
import { type RefreshAccessCodeRequest } from './requests/refresh-access-code.request';

export class UserService {
  private readonly _repository: UserRepository = new UserMockRepository();
  private readonly _userDTOMapper: UserDTOMapper = new UserDTOMapper();
  private readonly _uuidProvider: UuidProvider = SecurityConfiguration.instance.uuidProvider;
  private readonly _randomStringProvider: RandomStringProvider = SecurityConfiguration.instance.randomStringProvider
  private readonly _randomStringEncoderProvider: RandomStringEncoderProvider = SecurityConfiguration.instance.randomStringEncoderProvider
  private readonly _randomTokenProvider: RandomTokenProvider = SecurityConfiguration.instance.randomTokenProvider

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
      null,
      null,
      false,
      false,
      false
    );

    await this._repository.create(createdUser).catch(() => {
      throw new InternalServerException();
    });

    // TODO: Send Email

    return this._userDTOMapper.apply(createdUser);
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    const foundUsers = await this._repository
      .findBulk()
      .catch(() => {
        throw new InternalServerException();
      });

    for (const foundUser of foundUsers) {
      const comparedPassword = await this._randomStringEncoderProvider
        .compare(
          signInRequest.accessCode,
          foundUser.accessCode
        ).catch(() => {
          throw new InternalServerException();
        });

      if (comparedPassword) {
        const accessToken = this._randomTokenProvider.sign({ username: foundUser.username, email: foundUser.email }, 'accessTokenSecret', '1h');
        const refreshToken = this._randomTokenProvider.sign({ username: foundUser.username, email: foundUser.email }, 'refreshTokenSecret', '1d');

        const encodedRefreshToken = await this._randomStringEncoderProvider
          .hash(refreshToken, 10)
          .catch(() => {
            throw new InternalServerException();
          });

        const updatedUser = await this._repository
          .updateTokens(
            foundUser.uuid,
            accessToken,
            encodedRefreshToken
          ).catch(() => {
            throw new InternalServerException();
          });

        if (updatedUser === null) {
          throw new InternalServerException();
        }

        return this._userDTOMapper.apply(updatedUser);
      }
    }

    throw new NotFoundException();
  }

  public async signOut(uuid: string): Promise<UserDTO> {
    const foundUser = await this._repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException();
      });

    if (foundUser === null || foundUser === undefined) {
      throw new NotFoundException();
    };

    const updatedUser = await this._repository
      .updateTokens(foundUser.uuid, null, null)
      .catch(() => {
        throw new InternalServerException();
      });

    if (updatedUser === null) {
      throw new InternalServerException();
    }

    return this._userDTOMapper.apply(updatedUser);
  }

  public async refreshAccessCode(refreshAccessCodeRequest: RefreshAccessCodeRequest): Promise<UserDTO> {
    const foundUser = await this._repository
      .findByAuthCredentials(
        refreshAccessCodeRequest.username,
        refreshAccessCodeRequest.email,
        refreshAccessCodeRequest.phoneNumber
      ).catch(() => {
        throw new InternalServerException();
      });

    if (foundUser === null || foundUser === undefined) {
      throw new NotFoundException();
    };

    const generatedPassword = this._randomStringProvider.generate(12);
    const encodedPassword = await this._randomStringEncoderProvider
      .hash(generatedPassword, 10)
      .catch(() => { throw new InternalServerException(); });

    const updatedUser = await this._repository
      .updateAccessCode(foundUser.uuid, encodedPassword).catch(() => {
        throw new InternalServerException();
      });

    if (updatedUser === null) {
      throw new InternalServerException();
    }

    // TODO: Send Email

    return this._userDTOMapper.apply(updatedUser);
  }

  public async refreshTokens(uuid: string): Promise<UserDTO> {
    const foundUser = await this._repository
      .findOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerException();
      });

    if (foundUser === null || foundUser === undefined) {
      throw new NotFoundException();
    };

    const accessToken = this._randomTokenProvider.sign({ username: foundUser.username, email: foundUser.email }, 'accessTokenSecret', '1h');
    const refreshToken = this._randomTokenProvider.sign({ username: foundUser.username, email: foundUser.email }, 'refreshTokenSecret', '1d');

    const encodedRefreshToken = await this._randomStringEncoderProvider
      .hash(refreshToken, 10)
      .catch(() => {
        throw new InternalServerException();
      });

    const updatedUser = await this._repository
      .updateTokens(foundUser.uuid, accessToken, encodedRefreshToken)
      .catch(() => {
        throw new InternalServerException();
      });

    if (updatedUser === null) {
      throw new InternalServerException();
    }

    return this._userDTOMapper.apply(updatedUser);
  }
}
