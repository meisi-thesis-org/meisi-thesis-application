import { type Repository } from '@meisi-thesis/application-backend-shared/src/abstracts/repository.abstract';
import { type DeviceEntity } from './domain/device.entity';

export interface DeviceRepository extends Repository<string, DeviceEntity> {
  findDevicesByQueryParams(
    userUuid: string | undefined,
    ipAddress: string | undefined,
    platform: string | undefined,
    model: string | undefined
  ): Promise<DeviceEntity[]>
  findDeviceByProperties(
    userUuid: string,
    ipAddress: string | undefined,
    platform: string | undefined,
    model: string | undefined
  ): Promise<DeviceEntity | undefined>
  updateDeviceByUuid(uuid: string, ipAddress: string, platform: string, model: string): Promise<DeviceEntity | undefined>
  updateDeviceStatusByUuid(uuid: string, enabled: boolean): Promise<DeviceEntity | undefined>
  updateDeviceActivityByUuid(uuid: string, activated: boolean): Promise<DeviceEntity | undefined>
}
