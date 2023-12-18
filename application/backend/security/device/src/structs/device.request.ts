import { type DeviceEntity } from './device.domain'

type FindDevicesByUserUuidRequest =
  Readonly<Pick<DeviceEntity, 'userUuid'>>
type FindDeviceByUuidRequest =
  Readonly<Pick<DeviceEntity, 'uuid'>>
type CreateDeviceRequest =
  Readonly<Pick<DeviceEntity, 'userUuid' | 'userAgent'>>
type UpdateDeviceByUuidRequest =
  Readonly<Pick<DeviceEntity, 'uuid'>> &
  Partial<Readonly<Pick<DeviceEntity, 'userAgent' | 'visible' | 'active'>>>

export type {
  FindDevicesByUserUuidRequest,
  FindDeviceByUuidRequest,
  CreateDeviceRequest,
  UpdateDeviceByUuidRequest
}
