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

  async findWalletByUuid (entity: Pick<WalletEntity, 'uuid'>): Promise<WalletEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<WalletEntity>({
        name: 'find-wallet-by-uuid',
        text: 'SELECT * FROM wallets WHERE wallets.uuid = $1',
        values: [entity.uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findWalletByUserUuid (entity: Partial<Pick<WalletEntity, 'userUuid'>>): Promise<WalletEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<WalletEntity>({
        name: 'find-wallet-by-userUuid',
        text: 'SELECT * FROM wallets WHERE wallets.userUuid = $1',
        values: [entity.userUuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async createWallet (entity: WalletEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<WalletEntity>({
        name: 'create-wallet',
        text: 'INSERT INTO wallets ("uuid", "userUuid", "funds", "active", "visible", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [entity.uuid, entity.userUuid, entity.funds, entity.active, entity.visible, entity.createdAt, entity.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updateWalletByUuid (entity: WalletEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<WalletEntity>({
        name: 'update-wallets',
        text: 'UPDATE wallets SET wallets.funds = $1, wallets.active = $2, wallets.visible = $3, wallets.updatedAt = $4 WHERE users.uuid = $5',
        values: [entity.funds, entity.active, entity.visible, entity.updatedAt, entity.uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
