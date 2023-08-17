import { type UUID } from 'crypto';
import { type UserEntity } from './domain/user.entity';
import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';

export interface UserRepository extends Repository<UserEntity, UUID> {
  findByAuthCredentials(
    email: string,
    username: string,
    phoneNumber: string
  ): Promise<UserEntity | undefined>
}
