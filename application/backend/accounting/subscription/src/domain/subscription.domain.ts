type SubscriptionEntity = {
  readonly uuid: string
  userUuid: string
  subscriptionPlanUuid: string
  active: boolean
  readonly createdAt: string
  updatedAt: string
};
type SubscriptionDTO = Readonly<SubscriptionEntity>;
const subscriptionMapper = (entity: SubscriptionEntity): SubscriptionDTO => {
  return {
    uuid: entity.uuid,
    userUuid: entity.userUuid,
    subscriptionPlanUuid: entity.subscriptionPlanUuid,
    active: entity.active,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt
  }
};

export {
  type SubscriptionEntity,
  type SubscriptionDTO,
  subscriptionMapper
}
