type SubscriptionEntity = {
  readonly uuid: string
  readonly walletUuid: string
  readonly dossierUuid?: string
  readonly bookUuid?: string
  readonly chapterUuid?: string
  readonly pageUuid?: string
  active: boolean
  visible: boolean
  readonly createdAt: string
  readonly updatedAt: string
}
type SubscriptionDTO = Readonly<SubscriptionEntity>

const subscriptionMapper = (entity: SubscriptionEntity): SubscriptionDTO => ({
  uuid: entity.uuid,
  walletUuid: entity.walletUuid,
  dossierUuid: entity.dossierUuid,
  bookUuid: entity.bookUuid,
  chapterUuid: entity.chapterUuid,
  pageUuid: entity.pageUuid,
  active: entity.active,
  visible: entity.visible,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt
})

export { type SubscriptionEntity, type SubscriptionDTO, subscriptionMapper };
