import { type UserEntity } from '../domain/user.entity';
import { UserRepository } from '../user.repository';

export class UserMockRepository extends UserRepository {
  private readonly userEntityCollection = new Array<UserEntity>();

  public override findByAuth(
    username: string,
    email: string,
    phoneNumber: string
  ): UserEntity | null | undefined {
    return this.userEntityCollection.find((userEntity) => {
      if (
        userEntity.getUsername() === username ||
        userEntity.getEmail() === email ||
        userEntity.getPhoneNumber() === phoneNumber
      ) {
        return userEntity;
      }

      return undefined;
    })
  }
}
