import { type DeviceRepository } from '../device.repository';
import { type DeviceDTO, type DeviceEntity } from '../structs/device.domain';

export class DeviceStateRepository implements DeviceRepository {
  private readonly deviceCollection: DeviceEntity[] = new Array<DeviceEntity>();

  public async findDeviceByUserUuid (
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
    ipAddress: string
  ): Promise<DeviceDTO | undefined> {
    return this.deviceCollection.find((device) => {
      if (
        device.userUuid === userUuid &&
        device.ipAddress === ipAddress
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
  ): Promise<DeviceEntity | undefined> {
    return this.deviceCollection.find((device) => {
      if (device.uuid === uuid) device = { ...device, ...deviceEntity }
      return device
    })
  }
}
