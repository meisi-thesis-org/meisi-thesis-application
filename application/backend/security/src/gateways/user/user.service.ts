import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import { type UserDTO } from './domain/user.domain';
import { UserStateRepository } from './repositories/user-state.repository';
import { type FindUserByUuidRequest } from './requests/find-user-by-uuid.request';
import { type UserRepository } from './user.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-shared/src/exceptions/non-found.exception';
import { UserMapper } from './domain/user.mapper';

export class UserService {
  private readonly userRepository: UserRepository;
  private readonly userMapper: UserMapper;

  public constructor () {
    this.userRepository = new UserStateRepository();
    this.userMapper = new UserMapper();
  }

  public async findUserByUuid (findUserByUuidRequest: FindUserByUuidRequest): Promise<UserDTO> {
    const user = await this.userRepository
      .findOneByUuid(findUserByUuidRequest.getUuid())
      .catch(() => {
        throw new InternalServerException();
      })

    if (user === undefined) throw new NonFoundException();

    return this.userMapper.map(user);
  }
}
