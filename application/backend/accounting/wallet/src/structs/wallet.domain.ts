type WalletEntity = {
  readonly uuid: string
  readonly userUuid: string
  funds: number
  active: boolean
  visible: boolean
  readonly createdAt: string
  updatedAt: string
}
type WalletDTO = Readonly<WalletEntity>

const walletMapper = (entity: WalletEntity): WalletDTO => {
  return {
    uuid: entity.uuid,
    userUuid: entity.userUuid,
    funds: entity.funds,
    active: entity.active,
    visible: entity.visible,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}

export { type WalletEntity, type WalletDTO, walletMapper };
