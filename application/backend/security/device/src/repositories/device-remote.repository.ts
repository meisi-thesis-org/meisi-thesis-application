import { Client } from 'pg';
import { DeviceRepository } from '../device.repository';
import { DeviceEntity } from '../structs/device.domain';

export class DeviceRemoteRepository implements DeviceRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  public constructor() {
    this.provider.connect()
  }

  async findDevicesByUserUuid(userUuid: string | undefined): Promise<Array<Readonly<DeviceEntity>>> {
    const result = await this.provider.query<DeviceEntity>({
      name: 'find-devices-by-userUuid',
      text: `
        SELECT uuid, user_uuid as "userUuid", user_agent as "userAgent", visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM devices 
        WHERE devices.user_uuid = $1
      `,
      values: [userUuid]
    });

    return result.rows;
  }

  async findDeviceByUuid(uuid: string): Promise<Readonly<DeviceEntity> | undefined> {
    const result = await this.provider.query<DeviceEntity>({
      name: 'find-device-by-uuid',
      text: `
        SELECT uuid, user_uuid as "userUuid", user_agent as "userAgent", visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM devices 
        WHERE devices.uuid = $1
      `,
      values: [uuid]
    });

    return result.rows[0];
  }

  async findDeviceByProps(userUuid: string, userAgent: string): Promise<Readonly<DeviceEntity> | undefined> {
    const result = await this.provider.query<DeviceEntity>({
      name: 'find-devices-by-props',
      text: `
        SELECT uuid, user_uuid as "userUuid", user_agent as "userAgent", visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM devices
        WHERE devices.user_uuid = $1 AND devices.user_agent = $2
      `,
      values: [userUuid, userAgent]
    });
    return result.rows[0];
  }

  async createDevice(deviceEntity: DeviceEntity): Promise<void> {
    await this.provider.query<DeviceEntity>({
      name: 'create-device',
      text: 'INSERT INTO devices ("uuid", "user_uuid", "user_agent", "visible", "active", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [deviceEntity.uuid, deviceEntity.userUuid, deviceEntity.userAgent, deviceEntity.visible, deviceEntity.active, deviceEntity.createdAt, deviceEntity.updatedAt]
    });
  }

  async updateDeviceByUuid(uuid: string, deviceEntity: Omit<DeviceEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<void> {
    await this.provider.query<DeviceEntity>({
      name: 'update-device-by-uuid',
      text: 'UPDATE devices SET devices.user_agent = $1, devices.visible = $2, devices.active = $3, devices.updated_at = $4 WHERE devices.uuid = $5',
      values: [deviceEntity.userAgent, deviceEntity.visible, deviceEntity.active, deviceEntity.updatedAt, uuid]
    });
  }
}
