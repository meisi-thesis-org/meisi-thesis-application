import { type UserDTO } from './domain/user.domain';
import { UserStateRepository } from './repositories/user-state.repository';
import { type FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { type UserRepository } from './user.repository';

export class UserService {
  private readonly userRepository: UserRepository

  public constructor () {
    this.userRepository = new UserStateRepository();
  }

  public async findUserByUuid (findUserByUuidRequest: FindUserByUuidRequest): Promise<UserDTO> {
    throw new Error();
  }
}
