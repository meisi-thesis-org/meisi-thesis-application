import { type UserEntity } from '../domain/user.entity';
import { type UserRepository } from '../user.repository';

export class UserStateRepository implements UserRepository {
  private readonly userCollection: UserEntity[] = new Array<UserEntity>();

  public async findOneByUuid (uuid: string): Promise<UserEntity | undefined> {
    return this.userCollection.find((user) => user.getUuid().match(uuid));
  }
}
