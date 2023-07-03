import { Repository } from '../../shared/abstracts/repository';
import { type UserEntity } from './domain/user.entity';

export abstract class UserRepository extends Repository<UserEntity> {
  public abstract findByAuth(
    username: string | null,
    email: string | null,
    phoneNumber: string | null
  ): Promise<UserEntity | null | undefined>;
  public abstract updateTokens(
    uuid: string,
    encodedAccessToken: string | null,
    encodedRefreshToken: string | null
  ): Promise<UserEntity | null | undefined>;
  public abstract updateAccessCode(
    uuid: string,
    encodedAccessCode: string | null,
  ): Promise<UserEntity | null | undefined>;
  public abstract updateBlocked(
    uuid: string,
    blocked: boolean,
  ): Promise<UserEntity | null | undefined>;
  public abstract updateDeactivated(
    uuid: string,
    deactivated: boolean,
  ): Promise<UserEntity | null | undefined>;
  public abstract findByUuid(
    uuid: string
  ): Promise<UserEntity | null | undefined>;
}
