import { Repository } from '../../abstracts/repository';
import { type UserEntity } from './domain/user.entity';

export abstract class UserRepository extends Repository<UserEntity, string> {
  abstract findOneByAuthCredentials(
    username: string,
    email: string,
    phoneNumber: string,
  ): Promise<UserEntity | undefined | null>;
}
