import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserMockRepository extends UserRepository {
  private readonly _userArray: UserEntity[] = new Array<UserEntity>();
}
