import { type UserEntity } from './domain/user.entity';
import { Repository } from './../../../../shared/src/abstracts/repository.abstract'

export abstract class UserRepository extends Repository<UserEntity, string> {}
