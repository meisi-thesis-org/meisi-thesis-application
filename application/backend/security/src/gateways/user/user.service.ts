import { type UserRepository } from './user.repository';

export class UserService {
  private readonly userRepository: UserRepository

  public constructor () {
    this.userRepository = new UserStateRepository();
  }
}
