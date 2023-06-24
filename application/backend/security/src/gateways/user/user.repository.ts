import { Repository } from './../../../../shared/src/abstracts/repository.abstract';
import { type UserEntity } from './domain/user.entity';

export abstract class UserRepository extends Repository<UserEntity, string> {
  public abstract findUserByAuth(
    username: string,
    email: string,
    phoneNumber: string
  ): Promise<UserEntity | undefined>;
  public abstract updateTokens(
    uuid: string,
    accessToken: string | null,
    refreshToken: string | null
  ): Promise<UserEntity | undefined>;
}
