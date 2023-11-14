import { type UserEntity } from '../structs/user.domain';
import { type UserRepository } from '../user.repository';

export class UserStateRepository implements UserRepository {
  private readonly userEntityCollection: UserEntity[] = new Array<UserEntity>();

  public async findUserByUuid (
    uuid: string
  ): Promise<UserEntity | undefined> {
    return this.userEntityCollection.find((userEntity) => userEntity.uuid === uuid);
  }

  public async findBulk (): Promise<UserEntity[] | undefined> {
    return this.userEntityCollection;
  }

  public async findUserByAuthCredentials (
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<UserEntity | undefined> {
    return this.userEntityCollection.find((userEntity) => {
      if (
        userEntity.username === username ||
        userEntity.email === email ||
        userEntity.phoneNumber === phoneNumber
      ) return userEntity

      return undefined;
    });
  }

  public async createUser (
    userEntity: UserEntity
  ): Promise<void> {
    this.userEntityCollection.push(userEntity);
  }

  public async updateUser (
    userEntity: UserEntity
  ): Promise<void> {
    this.userEntityCollection.forEach((storedUserEntity) => {
      if (storedUserEntity.uuid === userEntity.uuid) {
        storedUserEntity = { ...userEntity, uuid: storedUserEntity.uuid }
      }
    })
  }
}
