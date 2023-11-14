import { type UserEntity } from './structs/user.domain';

export interface UserRepository {
  findBulk(): Promise<UserEntity[] | undefined>
  findUserByUuid(uuid: string): Promise<UserEntity | undefined>
  findUserByAuthCredentials(
    username: string,
    email: string,
    phoneNumber: string
  ): Promise<UserEntity | undefined>
  createUser(userEntity: UserEntity): Promise<void>
  updateUser(userEntity: UserEntity): Promise<void>
}
