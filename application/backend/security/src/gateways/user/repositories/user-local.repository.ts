import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserLocalRepository extends UserRepository {
  private readonly _userEntities: UserEntity[] = new Array<UserEntity>();

  public override async fetchBulk(): Promise<UserEntity[]> {
    return this._userEntities;
  }

  public override async findUserByAuth(
    username: string,
    email: string,
    phoneNumber: string
  ): Promise<UserEntity | undefined> {
    return this._userEntities.find((userEntity) => {
      if (userEntity.getUsername() === username) {
        return userEntity;
      }

      if (userEntity.getEmail() === email) {
        return userEntity;
      }

      if (userEntity.getPhoneNumber() === phoneNumber) {
        return userEntity;
      }

      return userEntity;
    })!;
  }

  public override async fetchOneByUuid(uuid: string): Promise<UserEntity | undefined> {
    return this._userEntities.find((userEntity) => userEntity.getUuid() === uuid)!;
  }

  public override async save(data: UserEntity): Promise<UserEntity> {
    this._userEntities.push(data);

    return this._userEntities.find((userEntity) => userEntity.getUuid() === data.getUuid())!;
  }

  public override async updateTokens(
    uuid: string,
    accessToken: string,
    refreshToken: string
  ): Promise<UserEntity | undefined> {
    return this._userEntities.find((userEntity) => {
      if (userEntity.getUuid() === uuid) {
        userEntity.setAccessToken(accessToken);
        userEntity.setRefreshToken(refreshToken);
      }

      return userEntity;
    })!;
  }
}
