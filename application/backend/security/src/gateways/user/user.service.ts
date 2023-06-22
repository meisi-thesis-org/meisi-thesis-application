import { HttpCodeCollection } from '../../../../shared/src/collections/http-code.collection';
import { UserDTOMapper } from './domain/user-dto.mapper';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { EncoderProvider } from './providers/encoder.provider';
import { GeneratorProvider } from './providers/generator.provider';
import { TokenProvider } from './providers/token.provider';
import { UserLocalRepository } from './repositories/user-local.repository';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly repository: UserRepository = new UserLocalRepository();
  private readonly userDTOMapper: UserDTOMapper = new UserDTOMapper();
  private readonly generatorProvider: GeneratorProvider = new GeneratorProvider();
  private readonly encoderProvider: EncoderProvider = new EncoderProvider();
  private readonly tokenProvider: TokenProvider = new TokenProvider();

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this.repository.findUserByAuth(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber()
    ).catch((error) => {
      throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
    });

    if (foundUser !== undefined) {
      throw { status: HttpCodeCollection.NOT_FOUND }
    }

    const generatedAccessCode = this.generatorProvider.generateRandomString(12);

    console.log(generatedAccessCode)
    const encodedAccessCode = await this.encoderProvider
      .hash(generatedAccessCode)
      .catch((error) => {
        throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
      });

    const userEntity = new UserEntity(
      this.generatorProvider.generateUuid(),
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber(),
      signUpRequest.getFirstName(),
      signUpRequest.getLastName(),
      signUpRequest.getDateBirth(),
      encodedAccessCode
    );

    const createdUser = await this.repository.save(userEntity).catch((error) => {
      throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, error }
    });

    return this.userDTOMapper.apply(createdUser)
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    const foundUsers = await this.repository.fetchBulk().catch((error) => {
      throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
    });

    for (const foundUser of foundUsers) {
      console.log(foundUser)
      console.log(signInRequest)
      const decoded = await this.encoderProvider.compare(
        signInRequest.getAccessCode(),
        foundUser.getAccessCode()
      ).catch((error) => {
        throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
      });

      console.log(decoded)

      if (decoded) {
        const payload = { username: foundUser.getUsername(), email: foundUser.getEmail() }
        const accessToken = this.tokenProvider.sign(payload, 'accessTokenSecret', '7d');
        const refreshToken = this.tokenProvider.sign(payload, 'refreshTokenSecret', '7d');

        const encryptedRefreshToken = await this.encoderProvider
          .hash(refreshToken)
          .catch((error) => {
            throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
          });

        const updatedUser = await this.repository.updateTokens(
          foundUser.getUuid(),
          accessToken,
          encryptedRefreshToken
        ).catch((error) => {
          throw { status: HttpCodeCollection.INTERNAL_SERVER_ERROR, ...error }
        });

        if (updatedUser === undefined) {
          throw { status: HttpCodeCollection.NOT_FOUND }
        }

        updatedUser.setRefreshToken(refreshToken);

        return this.userDTOMapper.apply(updatedUser);
      }
    }

    throw { status: HttpCodeCollection.BAD_REQUEST };
  }
}
