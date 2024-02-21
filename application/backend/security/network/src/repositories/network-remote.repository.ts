import { Client } from 'pg';
import { type NetworkRepository } from '../network.repository';
import { type NetworkEntity } from '../structs/network.domain';

export class NetworkRemoteRepository implements NetworkRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  async findNetworksByUserUuid (userUuid: string | undefined): Promise<Array<Readonly<NetworkEntity>>> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<NetworkEntity>({
        name: 'find-networks-by-userUuid',
        text: 'SELECT * FROM networks WHERE networks.userUuid = $1',
        values: [userUuid]
      });
      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  async findNetworkByUuid (uuid: string): Promise<Readonly<NetworkEntity> | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<NetworkEntity>({
        name: 'find-network-by-uuid',
        text: 'SELECT * FROM networks WHERE networks.uuid = $1',
        values: [uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findNetworkByProps (userUuid: string, latitude: number, longitude: number): Promise<Readonly<NetworkEntity> | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<NetworkEntity>({
        name: 'find-network-by-props',
        text: 'SELECT * FROM networks WHERE networks.userUuid = $1 AND networks.latitude = $2 AND networks.longitude = $3',
        values: [userUuid, latitude, longitude]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async createNetwork (networkEntity: NetworkEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<NetworkEntity>({
        name: 'create-network',
        text: 'INSERT INTO networks ("uuid", "userUuid", "latitude", "longitude", "visible", "active", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [networkEntity.uuid, networkEntity.userUuid, networkEntity.latitude, networkEntity.longitude, networkEntity.visible, networkEntity.active, networkEntity.createdAt, networkEntity.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updateNetworkByUuid (uuid: string, networkEntity: Omit<NetworkEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<NetworkEntity>({
        name: 'update-network-by-uuid',
        text: 'UPDATE networks SET networks.latitude = $1, networks.longitude = $2, networks.visible = $3, networks.active = $4, networks.updatedAt = $5 WHERE networks.uuid = $6',
        values: [networkEntity.latitude, networkEntity.longitude, networkEntity.visible, networkEntity.active, networkEntity.updatedAt, uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
