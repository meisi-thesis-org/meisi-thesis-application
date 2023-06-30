import { Repository } from 'typeorm';
import { type UserEntity } from './domain/user.entity';

export abstract class UserRepository extends Repository<UserEntity> {
  public abstract findByAuth(
    username: string,
    email: string,
    phoneNumber: string
  ): Promise<UserEntity | undefined | null>;
  public abstract updateTokens(
    uuid: string,
    encodedAccessCode: string,
    encodedRefreshCode: string
  ): Promise<UserEntity | undefined | null>;
}
