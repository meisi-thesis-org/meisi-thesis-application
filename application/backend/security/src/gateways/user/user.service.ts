import { type UserDTO } from './domain/user.dto';
import { type SignUpRequest } from './requests/sign-up.request';

export class UserService {
  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {}
}
