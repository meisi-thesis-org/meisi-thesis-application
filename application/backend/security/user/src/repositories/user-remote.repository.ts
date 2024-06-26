import { Client } from 'pg';
import { type UserEntity } from '../structs/user.domain';
import { type UserRepository } from '../user.repository';

export class UserRemoteRepository implements UserRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  public constructor () {
    void this.provider.connect();
  }

  public async findBulk (): Promise<UserEntity[] | undefined> {
    const result = await this.provider.query<UserEntity>({
      name: 'find-users',
      text: `
        SELECT uuid, username, email, access_code as "accessCode", phone_number as "phoneNumber", name, date_birth as "dateBirth", created_at as "createdAt", updated_at as "updatedAt" 
        FROM users
      `
    });
    return result.rows;
  }

  public async findUserByUuid (uuid: string): Promise<UserEntity | undefined> {
    const result = await this.provider.query<UserEntity>({
      name: 'find-user-by-uuid',
      text: `
        SELECT uuid, username, email, access_code as "accessCode", phone_number as "phoneNumber", name, date_birth as "dateBirth", created_at as "createdAt", updated_at as "updatedAt" 
        FROM users
        WHERE users.uuid = $1
      `,
      values: [uuid]
    });
    return result.rows[0];
  }

  public async findUserByAuthCredentials (
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<UserEntity | undefined> {
    const result = await this.provider.query<UserEntity>({
      name: 'find-user-by-auth-credentials',
      text: `
        SELECT uuid, username, email, access_code as "accessCode", phone_number as "phoneNumber", name, date_birth as "dateBirth", created_at as "createdAt", updated_at as "updatedAt" 
        FROM users
        WHERE users.username = $1 OR users.email = $2 OR users.phone_number = $3
      `,
      values: [username, email, phoneNumber]
    });
    return result.rows[0];
  }

  public async createUser (userEntity: UserEntity): Promise<void> {
    await this.provider.query<UserEntity>({
      name: 'create-user',
      text: 'INSERT INTO users ("uuid", "username", "email", "phone_number", "access_code", "name", "date_birth", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      values: [userEntity.uuid, userEntity.username, userEntity.email, userEntity.phoneNumber, userEntity.accessCode, userEntity.name, userEntity.dateBirth, userEntity.createdAt, userEntity.updatedAt]
    });
  }

  public async updateUser (userEntity: UserEntity): Promise<void> {
    await this.provider.query<UserEntity>({
      name: 'update-user',
      text: 'UPDATE users SET username = $1, email = $2, phone_number = $3, access_code = $4, name = $5, date_birth = $6, updated_at = $7 WHERE users.uuid = $8',
      values: [userEntity.username, userEntity.email, userEntity.phoneNumber, userEntity.accessCode, userEntity.name, userEntity.dateBirth, userEntity.updatedAt, userEntity.uuid]
    });
  }
}
