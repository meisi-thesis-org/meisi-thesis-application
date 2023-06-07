import { Repository } from '../../../../shared/src/abstracts/repository.abstract';
import { type UserEntity } from './domain/user.entity';

export abstract class UserRepository extends Repository<UserEntity, string> {}
