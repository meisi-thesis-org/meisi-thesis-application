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
import { NonFoundException } from './../../../../shared/src/exceptions/non-found.exception';
import { InternalServerErrorException } from './../../../../shared/src/exceptions/internal-server-error.exception';
import { BadRequestException } from './../../../../shared/src/exceptions/bad-request.exception';

export class UserService {
  private readonly repository: UserRepository = new UserLocalRepository();
  private readonly userDTOMapper: UserDTOMapper = new UserDTOMapper();
  private readonly generatorProvider: GeneratorProvider = new GeneratorProvider();
  private readonly encoderProvider: EncoderProvider = new EncoderProvider();
  private readonly tokenProvider: TokenProvider = new TokenProvider();

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this.repository
      .findUserByAuth(
        signUpRequest.getUsername(),
        signUpRequest.getEmail(),
        signUpRequest.getPhoneNumber()
      ).catch(() => {
        throw new InternalServerErrorException();
      });

    if (foundUser !== undefined) {
      throw new NonFoundException();
    }

    const generatedAccessCode = this.generatorProvider.generateRandomString(12);

    console.log(generatedAccessCode)
    const encodedAccessCode = await this.encoderProvider
      .hash(generatedAccessCode)
      .catch(() => {
        throw new InternalServerErrorException();
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

    const createdUser = await this.repository
      .save(userEntity)
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return this.userDTOMapper.apply(createdUser)
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    const foundUsers = await this.repository
      .fetchBulk()
      .catch(() => {
        throw new InternalServerErrorException();
      });

    for (const foundUser of foundUsers) {
      const decoded = await this.encoderProvider
        .compare(
          signInRequest.getAccessCode(),
          foundUser.getAccessCode()
        ).catch(() => {
          throw new InternalServerErrorException();
        });

      if (decoded) {
        const payload = { username: foundUser.getUsername(), email: foundUser.getEmail() }
        const accessToken = this.tokenProvider.sign(payload, 'accessTokenSecret', '7d');
        const refreshToken = this.tokenProvider.sign(payload, 'refreshTokenSecret', '7d');

        const encryptedRefreshToken = await this.encoderProvider
          .hash(refreshToken)
          .catch(() => {
            throw new InternalServerErrorException();
          });

        const updatedUser = await this.repository
          .updateTokens(
            foundUser.getUuid(),
            accessToken,
            encryptedRefreshToken
          ).catch(() => {
            throw new InternalServerErrorException();
          });

        if (updatedUser === undefined) {
          throw new NonFoundException();
        }

        updatedUser.setRefreshToken(refreshToken);

        return this.userDTOMapper.apply(updatedUser);
      }
    }

    throw new BadRequestException();
  }

  public async signOut(uuid: string): Promise<UserDTO> {
    const foundUser = await this.repository
      .fetchOneByUuid(uuid)
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (foundUser === undefined) {
      throw new NonFoundException();
    }

    const updatedUser = await this.repository
      .updateTokens(uuid, null, null)
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (updatedUser === undefined) {
      throw new NonFoundException();
    }

    return this.userDTOMapper.apply(updatedUser);
  }
}
