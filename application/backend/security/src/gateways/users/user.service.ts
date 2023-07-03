import { SecurityConfiguration } from '../../security.configuration';
import { ConflictException } from '../../shared/exceptions/conflict.exception';
import { InternalServerException } from '../../shared/exceptions/internal-server.exception';
import { NonFoundException } from '../../shared/exceptions/non-found.exception';
import { type EncoderProvider } from '../../shared/providers/encoder.provider';
import { type GeneratorProvider } from '../../shared/providers/generator.provider';
import { type NodemailerProvider } from '../../shared/providers/nodemailer.provider';
import { type TokenProvider } from '../../shared/providers/token.provider';
import { UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { UserMockRepository } from './repositories/user-mock.repository';
import { type RefreshAccessCodeRequest } from './requests/refresh-access-code.request';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';

export class UserService {
  private readonly repository = new UserMockRepository();
  private readonly userDTOMapper: UserDTOMapper = new UserDTOMapper();

  /** Providers */
  private readonly generatorProvider: GeneratorProvider = SecurityConfiguration.getInstance().getGeneratorProvider();
  private readonly encoderProvider: EncoderProvider = SecurityConfiguration.getInstance().getEncoderProvider();
  private readonly tokenProvider: TokenProvider = SecurityConfiguration.getInstance().getTokenProvider();
  private readonly nodemailerProvider: NodemailerProvider = SecurityConfiguration.getInstance().getNodemailerProvider();

  public async fetchUser(uuid: string): Promise<UserDTO> {
    const foundUser = await this.repository
      .findByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      });

    if (foundUser === undefined || foundUser === null) {
      throw new NonFoundException();
    }

    return this.userDTOMapper.apply(foundUser)
  }

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundByAuthUser = await this.repository
      .findByAuth(
        signUpRequest.getUsername(),
        signUpRequest.getEmail(),
        signUpRequest.getPhoneNumber()
      ).catch(() => {
        throw new InternalServerException()
      });

    if (
      foundByAuthUser !== null &&
      foundByAuthUser !== undefined
    ) {
      throw new ConflictException()
    }

    const accessCode = this.generatorProvider.generateRandomString(12);
    const encodedAccessCode = await this.encoderProvider
      .encode(accessCode)
      .catch(() => {
        throw new InternalServerException();
      });

    const userEntity = new UserEntity(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber(),
      signUpRequest.getFirstName(),
      signUpRequest.getLastName(),
      signUpRequest.getDateBirth(),
      encodedAccessCode
    );

    const savedUser = await this.repository
      .save(userEntity)
      .catch(() => {
        throw new InternalServerException()
      });

    if (savedUser === null || savedUser === undefined) {
      throw new NonFoundException()
    }

    await this.nodemailerProvider
      .sendEmail(
        savedUser.getEmail(),
        'E-Bookler | Created Account',
        accessCode
      )
      .catch(() => {
        throw new InternalServerException()
      });

    return this.userDTOMapper.apply(savedUser);
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    const userEntityCollection = await this.repository
      .findBulk()
      .catch(() => {
        throw new InternalServerException()
      });

    for (const userEntity of userEntityCollection) {
      const accessCodeMatches = await this.encoderProvider
        .compareEncode(
          signInRequest.getAccessCode(),
          userEntity.getAccessCode()
        ).catch(() => {
          throw new InternalServerException();
        })

      if (accessCodeMatches) {
        const payload = {
          uuid: userEntity.getUuid(),
          username: userEntity.getUsername(),
          email: userEntity.getEmail()
        }

        const accessToken = this.tokenProvider.createToken(payload, process.env.JWT_ACCESS_TOKEN_SECRET, '1h');
        const refreshToken = this.tokenProvider.createToken(payload, process.env.JWT_REFRESH_TOKEN_SECRET, '1d');

        const [
          encodedAccessToken,
          encodedRefreshToken
        ] = await Promise.all([
          this.encoderProvider.encode(accessToken),
          this.encoderProvider.encode(refreshToken)
        ]).catch(() => { throw new InternalServerException(); });

        const updateUser = await this.repository
          .updateTokens(
            userEntity.getUuid(),
            encodedAccessToken,
            encodedRefreshToken
          ).catch(() => {
            throw new InternalServerException();
          });

        if (updateUser === null || updateUser === undefined) {
          throw new NonFoundException()
        }

        updateUser.setAccessToken(accessToken);
        updateUser.setRefreshToken(refreshToken);

        return this.userDTOMapper.apply(updateUser);
      }
    }

    throw new NonFoundException();
  }

  public async signOut(uuid: string): Promise<UserDTO> {
    const foundUser = await this.repository
      .findByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      });

    if (foundUser === undefined || foundUser === null) {
      throw new NonFoundException();
    }

    const savedUser = await this.repository
      .updateTokens(uuid, null, null)
      .catch(() => {
        throw new InternalServerException()
      });

    if (savedUser === null || savedUser === undefined) {
      throw new NonFoundException()
    }

    return this.userDTOMapper.apply(savedUser);
  }

  public async refreshAccessCode(refreshAccessCodeRequest: RefreshAccessCodeRequest): Promise<UserDTO> {
    const foundUser = await this.repository
      .findByAuth(
        refreshAccessCodeRequest.getUsername(),
        refreshAccessCodeRequest.getEmail(),
        refreshAccessCodeRequest.getPhoneNumber()
      ).catch(() => {
        throw new InternalServerException()
      });

    if (foundUser === undefined || foundUser === null) {
      throw new NonFoundException();
    }

    const accessCode = this.generatorProvider.generateRandomString(12);
    const encodedAccessCode = await this.encoderProvider
      .encode(accessCode)
      .catch(() => {
        throw new InternalServerException();
      });

    const savedUser = await this.repository
      .updateAccessCode(foundUser.getUuid(), encodedAccessCode)
      .catch(() => {
        throw new InternalServerException()
      });

    if (savedUser === null || savedUser === undefined) {
      throw new NonFoundException()
    }

    await this.nodemailerProvider
      .sendEmail(
        savedUser.getEmail(),
        'E-Bookler | Refreshed AccessCode',
        accessCode
      )
      .catch(() => {
        throw new InternalServerException()
      });

    return this.userDTOMapper.apply(savedUser);
  }

  public async refreshTokens(uuid: string): Promise<UserDTO> {
    const foundUser = await this.repository
      .findByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      });

    if (foundUser === undefined || foundUser === null) {
      throw new NonFoundException();
    }

    const payload = {
      uuid: foundUser.getUuid(),
      username: foundUser.getUsername(),
      email: foundUser.getEmail()
    }

    const accessToken = this.tokenProvider.createToken(payload, 'devSecret', '1h');
    const refreshToken = this.tokenProvider.createToken(payload, 'devSecret', '1d');

    const [
      encodedAccessToken,
      encodedRefreshToken
    ] = await Promise.all([
      this.encoderProvider.encode(accessToken),
      this.encoderProvider.encode(refreshToken)
    ]).catch(() => { throw new InternalServerException(); });

    const updatedUser = await this.repository
      .updateTokens(
        foundUser.getUuid(),
        encodedAccessToken,
        encodedRefreshToken
      ).catch(() => {
        throw new InternalServerException();
      });

    if (updatedUser === null || updatedUser === undefined) {
      throw new NonFoundException()
    }

    updatedUser.setAccessToken(accessToken);
    updatedUser.setRefreshToken(refreshToken);

    return this.userDTOMapper.apply(updatedUser);
  }

  public async blocked(uuid: string): Promise<UserDTO> {
    const foundUser = await this.repository
      .findByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      });

    if (foundUser === undefined || foundUser === null) {
      throw new NonFoundException();
    }

    const savedUser = await this.repository
      .updateBlocked(uuid, !foundUser.getBlocked())
      .catch(() => {
        throw new InternalServerException()
      });

    if (savedUser === undefined || savedUser === null) {
      throw new NonFoundException();
    }

    await this.nodemailerProvider
      .sendEmail(
        savedUser.getEmail(),
        `E-Bookler | ${savedUser.getBlocked() ? 'Blocked' : 'Unblocked'} Account`,
        `Hello. Your account is now ${savedUser.getBlocked() ? 'Blocked' : 'Unblocked'}.`
      )
      .catch(() => {
        throw new InternalServerException()
      });

    return this.userDTOMapper.apply(savedUser);
  }

  public async deactivated(uuid: string): Promise<UserDTO> {
    const foundUser = await this.repository
      .findByUuid(uuid)
      .catch(() => {
        throw new InternalServerException()
      });

    if (foundUser === undefined || foundUser === null) {
      throw new NonFoundException();
    }

    const savedUser = await this.repository
      .updateDeactivated(uuid, !foundUser.getDeactivated())
      .catch(() => {
        throw new InternalServerException()
      });

    if (savedUser === undefined || savedUser === null) {
      throw new NonFoundException();
    }

    await this.nodemailerProvider
      .sendEmail(
        savedUser.getEmail(),
        `E-Bookler | ${savedUser.getDeactivated() ? 'Deactivated' : 'Activated'} Account`,
        `Hello. Your account is now ${savedUser.getDeactivated() ? 'Deactivated' : 'Activated'}.`
      )
      .catch(() => {
        throw new InternalServerException()
      });

    return this.userDTOMapper.apply(savedUser);
  }
}
