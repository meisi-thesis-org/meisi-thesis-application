type LocationEntity = {
  readonly uuid: string
  readonly userUuid: string
  coordinateX: string
  coordinateY: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}

type LocationDTO = Readonly<LocationEntity>
const locationMapper = (locationEntity: LocationEntity): LocationDTO => {
  return {
    uuid: locationEntity.uuid,
    userUuid: locationEntity.userUuid,
    coordinateX: locationEntity.coordinateX,
    coordinateY: locationEntity.coordinateY,
    visible: locationEntity.visible,
    active: locationEntity.active,
    createdAt: locationEntity.createdAt,
    updatedAt: locationEntity.updatedAt
  }
}

export {
  type LocationEntity,
  type LocationDTO,
  locationMapper
}
