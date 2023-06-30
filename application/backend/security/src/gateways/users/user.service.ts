import { SecurityConfiguration } from '../../security.configuration';
import { ConflictException } from '../../shared/exceptions/conflict.exception';
import { InternalServerException } from '../../shared/exceptions/internal-server.exception';
import { NonFoundException } from '../../shared/exceptions/non-found.exception';
import { type EncoderProvider } from '../../shared/providers/encoder.provider';
import { type GeneratorProvider } from '../../shared/providers/generator.provider';
import { UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { type RefreshAccessCodeRequest } from './requests/refresh-access-code.request';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly repository: UserRepository;
  private readonly userDTOMapper: UserDTOMapper = new UserDTOMapper();

  /** Providers */
  private readonly generatorProvider: GeneratorProvider = SecurityConfiguration.getInstance().getGeneratorProvider()
  private readonly encoderProvider: EncoderProvider = SecurityConfiguration.getInstance().getEncoderProvider()

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

    // TODO: Send Email

    return this.userDTOMapper.apply(savedUser);
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    const userEntityCollection = await this.repository.find().catch(() => {
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
        const accessToken = '';
        const refreshToken = '';

        const [
          encodedAccessToken,
          encodedRefreshToken
        ] = await Promise.all([
          this.encoderProvider.encode(accessToken),
          this.encoderProvider.encode(refreshToken)
        ]).catch(() => { throw new InternalServerException(); });

        const updatedUserEntity = await this.repository
          .updateTokens(
            userEntity.getUuid(),
            encodedAccessToken,
            encodedRefreshToken
          ).catch(() => {
            throw new InternalServerException();
          });

        if (updatedUserEntity === undefined || updatedUserEntity === null) {
          throw new NonFoundException();
        }

        updatedUserEntity.setAccessToken(accessToken);
        updatedUserEntity.setRefreshToken(refreshToken);

        return this.userDTOMapper.apply(updatedUserEntity);
      }
    }

    throw new NonFoundException();
  }

  public async signOut(uuid: string): Promise<UserDTO> {}

  public async refreshAccessCode(refreshAccessCodeRequest: RefreshAccessCodeRequest): Promise<UserDTO> {}

  public async refreshTokens(uuid: string): Promise<UserDTO> {}
}
