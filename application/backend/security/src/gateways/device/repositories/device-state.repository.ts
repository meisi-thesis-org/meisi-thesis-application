import { type DeviceRepository } from '../device.repository';
import { type DeviceEntity } from '../domain/device.entity';

export class DeviceStateRepository implements DeviceRepository {
  private readonly deviceCollection: DeviceEntity[]

  public constructor () {
    this.deviceCollection = new Array<DeviceEntity>();
  }

  public async findDevicesByQueryParams (
    userUuid: string | undefined,
    ipAddress: string | undefined,
    platform: string | undefined,
    model: string | undefined
  ): Promise<DeviceEntity[]> {
    const filteredByUserUuid: DeviceEntity[] = [];
    if (userUuid !== undefined) filteredByUserUuid.push(...this.deviceCollection.filter((deviceEntity) => deviceEntity.getUserUuid() === userUuid))
    const sanitizedArrayByUuid = filteredByUserUuid.length > 0 ? filteredByUserUuid : this.deviceCollection;

    const filteredByIpAddress: DeviceEntity[] = [];
    if (ipAddress !== undefined) filteredByIpAddress.push(...sanitizedArrayByUuid.filter((deviceEntity) => deviceEntity.getIpAddress() === ipAddress))
    const sanitizedArrayByIpAddress = filteredByIpAddress.length > 0 ? filteredByIpAddress : sanitizedArrayByUuid;

    const filteredByPlatform: DeviceEntity[] = [];
    if (platform !== undefined) filteredByPlatform.push(...sanitizedArrayByIpAddress.filter((deviceEntity) => deviceEntity.getPlatform() === platform))
    const sanitizedArrayByPlatform = filteredByPlatform.length > 0 ? filteredByPlatform : sanitizedArrayByIpAddress;

    const filteredByModel: DeviceEntity[] = [];
    if (model !== undefined) filteredByModel.push(...sanitizedArrayByPlatform.filter((deviceEntity) => deviceEntity.getModel() === model))

    if (model !== undefined) return filteredByModel.length === 0 ? [] : filteredByModel;
    if (platform !== undefined) return filteredByPlatform.length === 0 ? [] : filteredByPlatform;
    if (ipAddress !== undefined) return filteredByIpAddress.length === 0 ? [] : filteredByIpAddress;
    if (userUuid !== undefined) return filteredByUserUuid.length === 0 ? [] : filteredByUserUuid;

    return this.deviceCollection;
  }

  public async findBulk (): Promise<DeviceEntity[]> {
    throw new Error('Method not implemented.');
  }

  public async findOneByUuid (uuid: string): Promise<DeviceEntity | undefined> {
    return this.deviceCollection.find((deviceEntity) => deviceEntity.getUuid() === uuid);
  }

  public async createOne (entity: DeviceEntity): Promise<void> {
    this.deviceCollection.push(entity);
  }

  public async findDeviceByProperties (
    userUuid: string,
    ipAddress: string | undefined,
    platform: string | undefined,
    model: string | undefined
  ): Promise<DeviceEntity | undefined> {
    return this.deviceCollection.find((deviceEntity) =>
      (
        deviceEntity.getUserUuid() === userUuid &&
        deviceEntity.getIpAddress() === ipAddress &&
        deviceEntity.getPlatform() === platform &&
        deviceEntity.getModel() === model
      )
    )
  }

  public async updateDeviceByUuid (
    uuid: string,
    ipAddress: string,
    platform: string,
    model: string
  ): Promise<DeviceEntity | undefined> {
    return this.deviceCollection.find((deviceEntity) => {
      if (deviceEntity.getUuid() === uuid) {
        deviceEntity.setIpAddress(ipAddress);
        deviceEntity.setPlatform(platform);
        deviceEntity.setModel(model);
        deviceEntity.setUpdatedAt(new Date().toISOString())
      }

      return deviceEntity;
    })
  }

  public async updateDeviceStatusByUuid (
    uuid: string,
    enabled: boolean
  ): Promise<DeviceEntity | undefined> {
    return this.deviceCollection.find((deviceEntity) => {
      if (deviceEntity.getUuid() === uuid) {
        deviceEntity.setEnabled(enabled);
        deviceEntity.setUpdatedAt(new Date().toISOString())
      }

      return deviceEntity;
    })
  }

  public async updateDeviceActivityByUuid (
    uuid: string,
    activated: boolean
  ): Promise<DeviceEntity | undefined> {
    return this.deviceCollection.find((deviceEntity) => {
      if (deviceEntity.getUuid() === uuid) {
        deviceEntity.setActivated(activated);
        deviceEntity.setUpdatedAt(new Date().toISOString())
      }

      return deviceEntity;
    })
  }
}
