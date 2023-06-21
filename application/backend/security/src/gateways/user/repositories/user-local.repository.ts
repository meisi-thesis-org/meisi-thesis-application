import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserLocalRepository extends UserRepository {
  private readonly _userEntities: UserEntity[] = new Array<UserEntity>();

  public override async fetchOneByUuid(uuid: string): Promise<UserEntity | undefined> {
    return this._userEntities.find((userEntity) => userEntity.getUuid() === uuid);
  }

  public override async save(data: UserEntity): Promise<UserEntity | undefined> {
    this._userEntities.push(data);

    return await this.fetchOneByUuid(data.getUuid());
  }
}
