type NetworkEntity = {
  readonly uuid: string
  readonly userUuid: string
  latitude: number
  longitude: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type NetworkDTO = Readonly<NetworkEntity>
const networkMapper = (networkEntity: NetworkEntity): NetworkDTO => {
  return {
    uuid: networkEntity.uuid,
    userUuid: networkEntity.userUuid,
    latitude: networkEntity.latitude,
    longitude: networkEntity.longitude,
    visible: networkEntity.visible,
    active: networkEntity.active,
    createdAt: networkEntity.createdAt,
    updatedAt: networkEntity.updatedAt
  }
}

export {
  type NetworkEntity,
  type NetworkDTO,
  networkMapper
}
