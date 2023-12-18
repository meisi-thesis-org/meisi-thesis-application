import { type DeviceDTO, type DeviceEntity } from './structs/device.domain'

export interface DeviceRepository {
  findDeviceByUserUuid(userUuid: string | undefined): Promise<DeviceDTO[]>
  findDeviceByUuid(uuid: string): Promise<DeviceDTO | undefined>
  findDeviceByProps(
    userUuid: string,
    userAgent: string,
  ): Promise<DeviceDTO | undefined>
  createDevice(deviceEntity: DeviceEntity): Promise<void>
  updateDeviceByUuid(uuid: string, deviceEntity: Omit<DeviceEntity, 'uuid' | 'userUuid' | 'createdAt'>): Promise<DeviceEntity | undefined>
}
