type SubscriptionPlanContentEntity = {
  readonly uuid: string
  readonly subscriptionPlanUuid: string
  readonly chapterUuid: string | undefined
  readonly bookUuid: string | undefined
  readonly dossierUuid: string | undefined
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type SubscriptionPlanContentDTO = Readonly<SubscriptionPlanContentEntity>;
const SubscriptionPlanContentMapper = (entity: SubscriptionPlanContentEntity): SubscriptionPlanContentDTO => {
  return {
    uuid: entity.uuid,
    subscriptionPlanUuid: entity.subscriptionPlanUuid,
    chapterUuid: entity.chapterUuid,
    bookUuid: entity.bookUuid,
    dossierUuid: entity.dossierUuid,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}

export {
  type SubscriptionPlanContentEntity,
  type SubscriptionPlanContentDTO,
  SubscriptionPlanContentMapper
}
