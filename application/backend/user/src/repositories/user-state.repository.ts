import { type UUID } from 'crypto';
import { type UserEntity } from '../domain/user.entity';
import { type UserRepository } from '../user.repository';

export class UserStateRepository implements UserRepository {
  private readonly userEntityCollection: UserEntity[] = [];

  public async findByAuthCredentials (email: string, username: string, phoneNumber: string): Promise<UserEntity | undefined> {
    return this.userEntityCollection.find((userEntity) => {
      if (userEntity.getEmail().match(email) != null) return userEntity;
      if (userEntity.getUsername().match(username) != null) return userEntity;
      if (userEntity.getPhoneNumber().match(phoneNumber) != null) return userEntity;

      return undefined;
    })
  };

  public async findBulk (): Promise<UserEntity[]> {
    return this.userEntityCollection;
  }

  public async findOne (uuid: UUID): Promise<UserEntity | undefined> {
    return this.userEntityCollection.find((userEntity) => userEntity.getUuid().match(uuid));
  }

  public async createOne (entity: UserEntity): Promise<void> {
    this.userEntityCollection.push(entity);
  }

  public async updateOne (uuid: UUID, entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
