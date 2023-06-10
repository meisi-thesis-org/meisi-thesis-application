import { type UserDTO } from './domain/user.dto';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';

export class UserService {
  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    throw new Error('');
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    throw new Error('');
  }
}
