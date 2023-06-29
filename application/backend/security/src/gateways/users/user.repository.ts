import { type Repository } from 'typeorm';
import { type UserEntity } from './domain/user.entity';

export interface UserRepository extends Repository<UserEntity> {}
