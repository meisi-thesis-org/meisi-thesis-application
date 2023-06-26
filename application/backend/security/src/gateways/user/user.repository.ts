import { type Repository } from '../../abstracts/repository';

export interface UserRepository extends Repository<UserEntity, string> {}
