import { type UUID } from 'crypto';
import { type UserEntity } from '../domain/user.entity';
import { type UserRepository } from '../user.repository';

export class UserStateRepository implements UserRepository {
  private readonly userEntityCollection: UserEntity[] = [];

  public async findBulk (): Promise<UserEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async findOne (uuid: UUID): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }

  public async createOne (entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async updateOne (uuid: UUID, entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
