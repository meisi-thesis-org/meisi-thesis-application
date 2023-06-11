import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserMockRepository extends UserRepository {
  private readonly _userEntityList: UserEntity[] = new Array<UserEntity>();

  public override async findOneByUuid(uuid: string): Promise<UserEntity | undefined | null> {
    return this._userEntityList.find((userEntity) => userEntity.uuid.match(uuid))
  }

  public override async findByAuthCredentials(username: string, email: string, phoneNumber: string): Promise<UserEntity | null | undefined> {
    return this._userEntityList.find((userEntity) => {
      if (
        userEntity.username === username ||
        userEntity.email === email ||
        userEntity.phoneNumber === phoneNumber
      ) {
        return userEntity;
      }

      return undefined;
    });
  }

  public override async save(data: UserEntity): Promise<void> {
    this._userEntityList.push(data);
  }

  public override async findBulk(): Promise<UserEntity[]> {
    return this._userEntityList;
  }

  public override async updateTokens(
    uuid: string,
    accessToken: string,
    encodedRefreshToken: string
  ): Promise<UserEntity | null | undefined> {
    return this._userEntityList.find((userEntity) => {
      if (userEntity.uuid === uuid) {
        userEntity.accessToken = accessToken;
        userEntity.refreshToken = encodedRefreshToken;
      }

      return userEntity;
    });
  }
}
