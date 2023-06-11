import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserMockRepository extends UserRepository {
  private readonly _userEntityList: UserEntity[] = new Array<UserEntity>();

  public override async findOneByUuid(uuid: string): Promise<UserEntity | undefined | null> {
    return this._userEntityList.find((userEntity) => userEntity.uuid.match(uuid))
  }

  public override async findByAuthCredentials(username: string, email: string, phoneNumber: string): Promise<UserEntity | null> {
    const user = this._userEntityList.find((userEntity) => {
      if (
        userEntity.username === username ||
        userEntity.email === email ||
        userEntity.phoneNumber === phoneNumber
      ) {
        return userEntity;
      }

      return undefined;
    });

    return user !== undefined ? user : null;
  }

  public override async create(data: UserEntity): Promise<void> {
    this._userEntityList.push(data);
  }

  public override async findBulk(): Promise<UserEntity[]> {
    return this._userEntityList;
  }

  public override async updateTokens(
    uuid: string,
    accessToken: string,
    encodedRefreshToken: string
  ): Promise<UserEntity | null> {
    const user = this._userEntityList.find((userEntity) => {
      if (userEntity.uuid === uuid) {
        userEntity.accessToken = accessToken;
        userEntity.refreshToken = encodedRefreshToken;
      }

      return userEntity;
    });

    return user !== undefined ? user : null;
  }

  public override async updateAccessCode(
    uuid: string,
    accessCode: string
  ): Promise<UserEntity | null> {
    const user = this._userEntityList.find((userEntity) => {
      if (userEntity.uuid === uuid) {
        userEntity.accessCode = accessCode;
      }

      return userEntity;
    });

    return user !== undefined ? user : null;
  }
}
