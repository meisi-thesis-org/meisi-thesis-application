type DossierEntity = {
  readonly uuid: string
  readonly userUuid: string
  price: number
  designation: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}
type DossierDTO = Readonly<DossierEntity>

const dossierMapper = (dossierEntity: DossierEntity): DossierDTO => {
  return {
    uuid: dossierEntity.uuid,
    userUuid: dossierEntity.userUuid,
    price: dossierEntity.price,
    designation: dossierEntity.designation,
    visible: dossierEntity.visible,
    active: dossierEntity.active,
    createdAt: dossierEntity.createdAt,
    updatedAt: dossierEntity.updatedAt
  }
}

export {
  type DossierEntity,
  type DossierDTO,
  dossierMapper
}
