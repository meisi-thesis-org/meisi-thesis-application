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

  public async findUserByCredentials (username: string, email: string, phoneNumber: string): Promise<UserEntity | undefined> {
    return this.userCollection.find((user) =>
      user.getUsername() === username ||
      user.getEmail() === email ||
      user.getPhoneNumber() === phoneNumber
    );
  }

  public async createOne (entity: UserEntity): Promise<void> {
    this.userCollection.push(entity);
  }

  public async updateTokens (uuid: string, accessToken: string, refreshToken: string): Promise<void> {
    this.userCollection.find((user) => {
      if (user.getUuid() === uuid) {
        user.setAccessToken(accessToken);
        user.setRefreshToken(refreshToken);
      }

      return user;
    });
  }
}
