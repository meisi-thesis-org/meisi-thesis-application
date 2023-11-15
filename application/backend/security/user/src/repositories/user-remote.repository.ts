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

  public async findBulk (): Promise<UserEntity[] | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<UserEntity>('SELECT * FROM users');
      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  public async findUserByUuid (uuid: string): Promise<UserEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<UserEntity>({
        name: 'find-user-by-uuid',
        text: 'SELECT * FROM users WHERE users.uuid = $1',
        values: [uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  public async findUserByAuthCredentials (
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<UserEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<UserEntity>({
        name: 'find-user-by-auth-credentials',
        text: 'SELECT * FROM users WHERE users.username = $1 OR users.email = $2 OR users.phoneNumber = $3',
        values: [username, email, phoneNumber]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  public async createUser (userEntity: UserEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<UserEntity>({
        name: 'create-user',
        text: 'INSERT INTO users ("uuid", "username", "email", "phoneNumber", "accessCode", "name", "dateBirth", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [userEntity.uuid, userEntity.username, userEntity.email, userEntity.phoneNumber, userEntity.accessCode, userEntity.name, userEntity.dateBirth, userEntity.createdAt, userEntity.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  public async updateUser (userEntity: UserEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<UserEntity>({
        name: 'update-user',
        text: 'UPDATE users SET users.username = $1, users.email = $2, users.phoneNumber = $3, users.accessCode = $4, users.accessCode = $5, users.accessCode = $6, users.accessCode = $7 WHERE users.uuid = $8',
        values: [userEntity.username, userEntity.email, userEntity.phoneNumber, userEntity.accessCode, userEntity.name, userEntity.dateBirth, userEntity.updatedAt, userEntity.uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
