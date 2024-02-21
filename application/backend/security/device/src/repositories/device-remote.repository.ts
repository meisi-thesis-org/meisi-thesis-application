import { Client } from 'pg';
import { type DeviceRepository } from '../device.repository';
import { type DeviceEntity } from '../structs/device.domain';

export class DeviceRemoteRepository implements DeviceRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  async findDevicesByUserUuid (userUuid: string | undefined): Promise<Array<Readonly<DeviceEntity>>> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<DeviceEntity>({
        name: 'find-devices-by-userUuid',
        text: 'SELECT * FROM devices WHERE devices.userUuid = $1',
        values: [userUuid]
      });
      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  async findDeviceByUuid (uuid: string): Promise<Readonly<DeviceEntity> | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<DeviceEntity>({
        name: 'find-device-by-uuid',
        text: 'SELECT * FROM devices WHERE devices.uuid = $1',
        values: [uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findDeviceByProps (userUuid: string, userAgent: string): Promise<Readonly<DeviceEntity> | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<DeviceEntity>({
        name: 'find-devices-by-props',
        text: 'SELECT * FROM devices WHERE devices.userUuid = $1 AND devices.userAgent = $2',
        values: [userUuid, userAgent]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async createDevice (deviceEntity: DeviceEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<DeviceEntity>({
        name: 'create-device',
        text: 'INSERT INTO devices ("uuid", "userUuid", "userAgent", "visible", "active", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [deviceEntity.uuid, deviceEntity.userUuid, deviceEntity.userAgent, deviceEntity.visible, deviceEntity.active, deviceEntity.createdAt, deviceEntity.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updateDeviceByUuid (uuid: string, deviceEntity: Omit<DeviceEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<DeviceEntity>({
        name: 'update-device-by-uuid',
        text: 'UPDATE devices SET devices.userAgent = $1, devices.visible = $2, devices.active = $3, devices.updatedAt = $4 WHERE devices.uuid = $5',
        values: [deviceEntity.userAgent, deviceEntity.visible, deviceEntity.active, deviceEntity.updatedAt, uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
