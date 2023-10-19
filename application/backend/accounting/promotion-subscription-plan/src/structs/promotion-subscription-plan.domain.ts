type PromotionSubscriptionPlanEntity = {
  readonly uuid: string
  readonly promotionUuid: string
  readonly subscriptionPlanUuid: string
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type PromotionSubscriptionPlanDTO = Readonly<PromotionSubscriptionPlanEntity>;
const promotionSubscriptionPlanMapper = (entity: PromotionSubscriptionPlanEntity): PromotionSubscriptionPlanDTO => {
  return {
    uuid: entity.uuid,
    promotionUuid: entity.promotionUuid,
    subscriptionPlanUuid: entity.subscriptionPlanUuid,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
}

export {
  type PromotionSubscriptionPlanEntity,
  type PromotionSubscriptionPlanDTO,
  promotionSubscriptionPlanMapper
}
