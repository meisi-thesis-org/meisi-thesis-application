import { Client } from 'pg';
import { type WalletEntity } from '../structs/wallet.domain';
import { type WalletRepository } from '../wallet.repository';

export class WalletRemoteRepository implements WalletRepository {
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

  async findWalletByUuid (entity: Pick<WalletEntity, 'uuid'>): Promise<WalletEntity | undefined> {
    const result = await this.provider.query<WalletEntity>({
      name: 'find-wallet-by-uuid',
      text: 'SELECT uuid, user_uuid as "userUuid", funds, active, visible, created_at as "createdAt", updated_at as "updatedAt" FROM wallets WHERE wallets.uuid = $1',
      values: [entity.uuid]
    });
    return result.rows[0];
  }

  async findWalletByUserUuid (entity: Partial<Pick<WalletEntity, 'userUuid'>>): Promise<WalletEntity | undefined> {
    const result = await this.provider.query<WalletEntity>({
      name: 'find-wallet-by-userUuid',
      text: 'SELECT uuid, user_uuid as "userUuid", funds, active, visible, created_at as "createdAt", updated_at as "updatedAt" FROM wallets WHERE wallets.user_uuid = $1',
      values: [entity.userUuid]
    });
    return result.rows[0];
  }

  async createWallet (entity: WalletEntity): Promise<void> {
    await this.provider.query<WalletEntity>({
      name: 'create-wallet',
      text: 'INSERT INTO wallets ("uuid", "user_uuid", "funds", "active", "visible", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [entity.uuid, entity.userUuid, entity.funds, entity.active, entity.visible, entity.createdAt, entity.updatedAt]
    });
  }

  async updateWalletByUuid (entity: WalletEntity): Promise<void> {
    await this.provider.query<WalletEntity>({
      name: 'update-wallets',
      text: 'UPDATE wallets SET funds = $1, active = $2, visible = $3, updatedAt = $4 WHERE users.uuid = $5',
      values: [entity.funds, entity.active, entity.visible, entity.updatedAt, entity.uuid]
    });
  }
}
