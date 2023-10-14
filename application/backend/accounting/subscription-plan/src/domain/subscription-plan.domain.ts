type SubscriptionPlanEntity = {
  readonly uuid: string
  designation: string
  description: string
  price: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type SubscriptionPlanDTO = Readonly<SubscriptionPlanEntity>;
const subscriptionPlanMapper = (
  entity: SubscriptionPlanEntity
): SubscriptionPlanDTO => {
  return {
    uuid: entity.uuid,
    designation: entity.designation,
    description: entity.description,
    price: entity.price,
    visible: entity.visible,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
};

export {
  type SubscriptionPlanEntity,
  type SubscriptionPlanDTO,
  subscriptionPlanMapper
}
