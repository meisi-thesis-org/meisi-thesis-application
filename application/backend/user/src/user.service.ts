import { randomUUID } from 'crypto';
import { type UserDTO } from './domain/user.dto';
import { UserEntity } from './domain/user.entity';
import { type RecoverAccessCodeRequest } from './requests/recover-access-code.request';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { UserStateRepository } from './repositories/user-state.repository';
import { UserMapper } from './domain/user.mapper';
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { CryptoProvider } from '@meisi-thesis/application-backend-shared/src/providers/crypto.provider';

export class UserService {
  private readonly userRepository = new UserStateRepository();
  private readonly userMapper = new UserMapper();

  public async signUp (signUpRequest: SignUpRequest): Promise<UserDTO> {
    const createdUser = new UserEntity(
      signUpRequest.getUsername(),
      signUpRequest.getEmail(),
      signUpRequest.getPhoneNumber(),
      new CryptoProvider().randomString(20),
      '',
      '',
      ''
    );

    await this.userRepository.createOne(createdUser).catch(() => {
      throw new InternalServerException()
    });

    return this.userMapper.apply(createdUser);
  }

  public async signIn (signInRequest: SignInRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async recoverAccessCode (recoverAccessCode: RecoverAccessCodeRequest): Promise<UserDTO> {
    throw new Error();
  }
}
