import { type DeviceEntity } from './device.domain'

type FindDevicesByUserUuidRequest =
  Readonly<Pick<DeviceEntity, 'userUuid'>>
type FindDeviceByUuidRequest =
  Readonly<Pick<DeviceEntity, 'uuid'>>
type CreateDeviceRequest =
  Readonly<Pick<DeviceEntity, 'userUuid' | 'ipAddress'>>
type UpdateDeviceByUuidRequest =
  Readonly<Pick<DeviceEntity, 'uuid'>> &
  Partial<Readonly<Pick<DeviceEntity, 'ipAddress' | 'visible' | 'active'>>>

export type {
  FindDevicesByUserUuidRequest,
  FindDeviceByUuidRequest,
  CreateDeviceRequest,
  UpdateDeviceByUuidRequest
}
