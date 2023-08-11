import { type Repository } from '../../shared/abstracts/repository.abstract';
import { type User } from './domain/user.entity';

export interface UserRepository extends Repository<User> {}
