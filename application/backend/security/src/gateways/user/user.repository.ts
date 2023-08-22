import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type UserEntity } from './domain/user.entity';

export interface UserRepository extends Repository<string, UserEntity> {}
