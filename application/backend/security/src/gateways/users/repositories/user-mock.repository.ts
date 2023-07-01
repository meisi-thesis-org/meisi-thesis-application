import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserMockRepository extends UserRepository {
  private readonly userEntityCollection = new Array<UserEntity>();

  public override async findBulk(): Promise<UserEntity[]> {
    return this.userEntityCollection;
  }

  public override async save(entity: UserEntity): Promise<UserEntity | null | undefined> {
    this.userEntityCollection.push(entity);

    return this.userEntityCollection.find((userEntity) => userEntity.getUuid() === entity.getUuid());
  }

  public override async findByAuth(
    username: string | null,
    email: string | null,
    phoneNumber: string | null
  ): Promise<UserEntity | null | undefined> {
    return this.userEntityCollection.find((userEntity) => {
      if (
        userEntity.getUsername() === username ||
        userEntity.getEmail() === email ||
        userEntity.getPhoneNumber() === phoneNumber
      ) {
        return userEntity;
      }

      return undefined;
    })
  }

  public override async updateTokens(
    uuid: string,
    encodedAccessToken: string | null,
    encodedRefreshToken: string | null
  ): Promise<UserEntity | null | undefined> {
    return this.userEntityCollection.find((userEntity) => {
      if (userEntity.getUuid() === uuid) {
        userEntity.setAccessToken(encodedAccessToken);
        userEntity.setAccessToken(encodedRefreshToken);
      }

      return undefined;
    });
  }

  public override async updateAccessCode(
    uuid: string,
    encodedAccessCode: string
  ): Promise<UserEntity | null | undefined> {
    return this.userEntityCollection.find((userEntity) => {
      if (userEntity.getUuid() === uuid) {
        userEntity.setAccessCode(encodedAccessCode);
      }

      return undefined;
    });
  }

  public override async findByUuid(
    uuid: string
  ): Promise<UserEntity | null | undefined> {
    return this.userEntityCollection.find((userEntity) => userEntity.getUuid() === uuid);
  }
}
