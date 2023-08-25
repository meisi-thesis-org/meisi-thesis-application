import { type ConnectionRepository } from '../connection.repository';
import { type ConnectionEntity } from '../domain/connection.entity';

export class ConnectionStateRepository implements ConnectionRepository {
  async updateRefreshTokens (uuid: string, data: { accessToken: string, refreshToken: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findBulk (): Promise<ConnectionEntity[]> {
    throw new Error('Method not implemented.');
  }

  async findOneByUuid (uuid: string): Promise<ConnectionEntity | undefined> {
    throw new Error('Method not implemented.');
  }

  async createOne (entity: ConnectionEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
