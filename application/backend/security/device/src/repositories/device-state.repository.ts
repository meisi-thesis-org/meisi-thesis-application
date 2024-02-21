import { type DeviceRepository } from '../device.repository';
import { type DeviceDTO, type DeviceEntity } from '../structs/device.domain';

export class DeviceStateRepository implements DeviceRepository {
  private deviceCollection: DeviceEntity[] = new Array<DeviceEntity>();

  public async findDevicesByUserUuid (
    userUuid: string | undefined
  ): Promise<DeviceDTO[]> {
    return this.deviceCollection.filter((device) => device.userUuid === userUuid);
  }

  public async findDeviceByUuid (
    uuid: string
  ): Promise<DeviceDTO | undefined> {
    return this.deviceCollection.find((device) => device.uuid === uuid);
  }

  public async findDeviceByProps (
    userUuid: string,
    userAgent: string
  ): Promise<DeviceDTO | undefined> {
    return this.deviceCollection.find((device) => {
      if (
        device.userUuid === userUuid &&
        device.userAgent === userAgent
      ) return device

      return undefined
    });
  }

  public async createDevice (
    deviceEntity: DeviceEntity
  ): Promise<void> {
    this.deviceCollection.push(deviceEntity)
  }

  public async updateDeviceByUuid (
    uuid: string,
    deviceEntity: Omit<DeviceEntity, 'uuid' | 'userUuid' | 'createdAt'>
  ): Promise<void> {
    this.deviceCollection = this.deviceCollection.map((device) => {
      if (device.uuid === uuid) device = { ...device, ...deviceEntity }
      return device;
    })
  }
}
