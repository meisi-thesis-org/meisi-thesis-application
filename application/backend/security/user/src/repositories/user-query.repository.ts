import { Kysely, PostgresDialect } from 'kysely';
import { type UserEntity } from '../structs/user.domain';
import { type UserRepository } from '../user.repository';
import { type UserDatabase } from '../structs/user.database';
import { Pool } from 'pg';

export class UserQueryRepository implements UserRepository {
  private readonly db: Kysely<UserDatabase>;

  public constructor () {
    this.db = new Kysely<UserDatabase>({
      dialect: new PostgresDialect({
        pool: new Pool({
          database: process.env.dbName,
          host: process.env.dbHost,
          user: process.env.dbUser,
          password: process.env.dbPassword,
          port: Number(process.env.dbPort)
        })
      })
    })
  }

  async findBulk (): Promise<UserEntity[] | undefined> {
    return await this.db.selectFrom('user').selectAll().execute()
  }

  async findUserByUuid (uuid: string): Promise<UserEntity | undefined> {
    return await this.db.selectFrom('user').where('uuid', '=', uuid).selectAll().executeTakeFirst()
  }

  async findUserByAuthCredentials (
    username: string | undefined,
    email: string | undefined,
    phoneNumber: string | undefined
  ): Promise<UserEntity | undefined> {
    return await this.db
      .selectFrom('user')
      .where((condition) => condition.or([
        condition('username', '=', username ?? ''),
        condition('email', '=', email ?? ''),
        condition('phoneNumber', '=', phoneNumber ?? '')
      ]))
      .selectAll()
      .executeTakeFirst()
  }

  async createUser (userEntity: UserEntity): Promise<void> {
    await this.db.insertInto('user').values(userEntity).executeTakeFirst()
  }

  async updateUser (userEntity: UserEntity): Promise<void> {
    await this.db.updateTable('user').set(
      {
        username: userEntity.username,
        email: userEntity.email,
        phoneNumber: userEntity.phoneNumber,
        accessCode: userEntity.accessCode,
        name: userEntity.name,
        dateBirth: userEntity.dateBirth,
        updatedAt: userEntity.updatedAt
      }
    ).where('uuid', '=', userEntity.uuid).executeTakeFirst()
  }
}
