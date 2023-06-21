import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserLocalRepository extends UserRepository {
  private readonly _userEntities: UserEntity[] = new Array<UserEntity>();

  public override async fetchOneByUuid(uuid: string): Promise<UserEntity | undefined> {
    return this._userEntities.find((userEntity) => userEntity.getUuid() === uuid);
  }

  public override async save(data: UserEntity): Promise<void> {
    this._userEntities.push(data);
  }

  public override async deleteOneByUuid(uuid: string): Promise<void> {
    this._userEntities.filter((userEntity) => {
      if (userEntity.getUuid() === uuid) {
        userEntity.setDeactivated(false);
        userEntity.setActivated(false);
      }

      return userEntity
    })
  }
}
