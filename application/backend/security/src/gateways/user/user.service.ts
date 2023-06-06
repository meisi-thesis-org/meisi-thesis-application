import { type UserDTO } from './domain/user.dto';
import { type RefreshCodeRequest } from './requests/refresh-code.request';
import { type SignInRequest } from './requests/sign-in.request';
import { type SignUpRequest } from './requests/sign-up.request';
import { type UserRepository } from './user.repository';

export class UserService {
  public constructor(
    private readonly _repository: UserRepository
  ) {}

  public async fetchUser(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async signUp(signUpRequest: SignUpRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async signIn(signInRequest: SignInRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async signOut(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async refreshCode(refreshCode: RefreshCodeRequest): Promise<UserDTO> {
    throw new Error();
  }

  public async refreshToken(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async block(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async unblock(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async deactivate(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async activate(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async acceptPrivacyTerms(uuid: string): Promise<UserDTO> {
    throw new Error();
  }

  public async refusePrivacyTerms(uuid: string): Promise<UserDTO> {
    throw new Error();
  }
}
