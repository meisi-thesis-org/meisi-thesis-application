type DeviceEntity = {
  readonly uuid: string
  readonly userUuid: string
  userAgent: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type DeviceDTO = Readonly<DeviceEntity>

const deviceMapper = (deviceEntity: DeviceEntity): DeviceDTO => {
  return {
    uuid: deviceEntity.uuid,
    userUuid: deviceEntity.userUuid,
    userAgent: deviceEntity.userAgent,
    visible: deviceEntity.visible,
    active: deviceEntity.active,
    createdAt: deviceEntity.createdAt,
    updatedAt: deviceEntity.updatedAt
  }
}

export {
  type DeviceEntity,
  type DeviceDTO,
  deviceMapper
}
