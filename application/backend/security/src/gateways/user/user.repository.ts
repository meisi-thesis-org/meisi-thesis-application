import { type UserEntity } from './domain/user.entity';
import { Repository } from './../../../../shared/src/abstracts/repository.abstract'

export abstract class UserRepository extends Repository<UserEntity, string> {
  public abstract findByAuthCredentials(
    username: string,
    email: string,
    phoneNumber: string
  ): Promise<UserEntity | null | undefined>;
  public abstract updateTokens(
    uuid: string,
    accessToken: null,
    encodedRefreshToken: null
  ): Promise<UserEntity | null | undefined>;
}
