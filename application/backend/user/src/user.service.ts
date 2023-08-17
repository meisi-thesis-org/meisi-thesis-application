import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { type RecoverAccessCodeRequest } from './requests/recover-access-code.request';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { UserStateRepository } from './repositories/user-state.repository';
import { UserMapper } from './domain/user.mapper';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { RandomizerProvider } from '@meisi-thesis/application-backend-shared/src/providers/randomizer.provider';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { EncoderProvider } from '@meisi-thesis/application-backend-shared/src/providers/encoder.provider';

export class UserService {
  private readonly userRepository = new UserStateRepository();
  private readonly userMapper = new UserMapper();

  public async signUp (signUpRequest: SignUpRequest): Promise<UserDTO> {
    const foundUser = await this.userRepository
      .findByAuthCredentials(
        signUpRequest.getEmail(),
        signUpRequest.getUsername(),
        signUpRequest.getPhoneNumber()
      ).catch(() => {
        throw new InternalServerException();
      });

    if (foundUser === undefined) throw new NonFoundException();

    const randomizedPassword = new RandomizerProvider()
      .randomString(20);
    const encodedPassword = await new EncoderProvider()
      .encode(randomizedPassword, 64)
      .catch(() => {
        throw new InternalServerException();
      })

    const createdUser = new UserEntity(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber(),
      encodedPassword,
      '',
      '',
      ''
    );

    await this.userRepository
      .createOne(createdUser)
      .catch(() => {
        throw new InternalServerException();
      });

    // TODO: Cross Cutting Service ( MailSender )

    return this.userMapper.apply(createdUser);
  }

  public async signIn (signInRequest: SignInRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async recoverAccessCode (recoverAccessCode: RecoverAccessCodeRequest): Promise<UserDTO> {
    throw new Error();
  }
}
