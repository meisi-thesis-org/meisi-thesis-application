import { type UserEntity } from '../domain/user.entity';
import { type UserRepository } from '../user.repository';

export class UserStateRepository implements UserRepository {
  private readonly userCollection: UserEntity[] = new Array<UserEntity>();

  public async findBulk (): Promise<UserEntity[]> {
    return this.userCollection;
  }

  public async findOneByUuid (uuid: string): Promise<UserEntity | undefined> {
    return this.userCollection.find((user) => user.getUuid() === uuid);
  }

  public async findUserByCredentials (
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<UserEntity | undefined> {
    return this.userCollection.find((user) =>
      user.getUsername() === username ||
      user.getEmail() === email ||
      user.getPhoneNumber() === phoneNumber
    );
  }

  public async createOne (entity: UserEntity): Promise<void> {
    this.userCollection.push(entity);
  }

  public async updateTokens (uuid: string, accessToken: string, refreshToken: string): Promise<UserEntity | undefined> {
    return this.userCollection.find((user) => {
      if (user.getUuid() === uuid) {
        user.setAccessToken(accessToken);
        user.setRefreshToken(refreshToken);
        user.setUpdatedAt(new Date().toISOString())
      }

      return user;
    });
  }

  public async updateAccessCode (uuid: string, accessCode: string): Promise<UserEntity | undefined> {
    return this.userCollection.find((user) => {
      if (user.getUuid() === uuid) {
        user.setAccessCode(accessCode);
        user.setUpdatedAt(new Date().toISOString())
      }

      return user;
    });
  }
}
