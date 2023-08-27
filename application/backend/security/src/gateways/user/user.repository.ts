import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type UserEntity } from './domain/user.entity';

export interface UserRepository extends Repository<string, UserEntity> {
  findUserByCredentials(username: string | undefined, email: string | undefined, phoneNumber: string | undefined): Promise<UserEntity | undefined>
  updateTokens(uuid: string, accessToken: string, refreshToken: string): Promise<UserEntity | undefined>
  updateAccessCode(uuid: string, accessCode: string): Promise<UserEntity | undefined>
}
