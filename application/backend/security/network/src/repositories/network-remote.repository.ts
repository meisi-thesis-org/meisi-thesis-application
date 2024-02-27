import { Client } from 'pg';
import { NetworkRepository } from '../network.repository';
import { NetworkEntity } from '../structs/network.domain';

export class NetworkRemoteRepository implements NetworkRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  });

  public constructor() {
    this.provider.connect()
  }

  async findNetworksByUserUuid(userUuid: string | undefined): Promise<Array<Readonly<NetworkEntity>>> {
    const result = await this.provider.query<NetworkEntity>({
      name: 'find-networks-by-userUuid',
      text: `
        SELECT uuid, user_uuid as "userUuid", latitude, longitude, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM networks 
        WHERE networks.user_uuid = $1
      `,
      values: [userUuid]
    });
    return result.rows;
  }

  async findNetworkByUuid(uuid: string): Promise<Readonly<NetworkEntity> | undefined> {
    const result = await this.provider.query<NetworkEntity>({
      name: 'find-network-by-uuid',
      text: `
        SELECT uuid, user_uuid as "userUuid", latitude, longitude, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM networks 
        WHERE networks.uuid = $1
      `,
      values: [uuid]
    });
    return result.rows[0];
  }

  async findNetworkByProps(userUuid: string, latitude: number, longitude: number): Promise<Readonly<NetworkEntity> | undefined> {
    const result = await this.provider.query<NetworkEntity>({
      name: 'find-network-by-props',
      text: `
        SELECT uuid, user_uuid as "userUuid", latitude, longitude, visible, active, created_at as "createdAt", updated_at as "updatedAt"
        FROM networks 
        WHERE networks.user_uuid = $1 AND networks.latitude = $2 AND networks.longitude = $3
      `,
      values: [userUuid, latitude, longitude]
    });
    return result.rows[0];
  }

  async createNetwork(networkEntity: NetworkEntity): Promise<void> {
    await this.provider.query<NetworkEntity>({
      name: 'create-network',
      text: 'INSERT INTO networks ("uuid", "user_uuid", "latitude", "longitude", "visible", "active", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      values: [networkEntity.uuid, networkEntity.userUuid, networkEntity.latitude, networkEntity.longitude, networkEntity.visible, networkEntity.active, networkEntity.createdAt, networkEntity.updatedAt]
    });
  }

  async updateNetworkByUuid(uuid: string, networkEntity: Omit<NetworkEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<void> {
    await this.provider.query<NetworkEntity>({
      name: 'update-network-by-uuid',
      text: 'UPDATE networks SET networks.latitude = $1, networks.longitude = $2, networks.visible = $3, networks.active = $4, networks.update_at = $5 WHERE networks.uuid = $6',
      values: [networkEntity.latitude, networkEntity.longitude, networkEntity.visible, networkEntity.active, networkEntity.updatedAt, uuid]
    });
  }
}
