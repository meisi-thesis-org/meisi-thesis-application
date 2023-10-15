import { type SubscriptionEntity } from './domain/subscription.domain'

export interface SubscriptionRepository {
  findOneByUuid(
    uuid: string
  ): Promise<SubscriptionEntity | undefined>
  findOneByUserSubscriptionPlan(
    subscriptionEntity: Pick<SubscriptionEntity, 'userUuid' | 'subscriptionPlanUuid'>
  ): Promise<SubscriptionEntity | undefined>
  createOne(
    subscriptionEntity: SubscriptionEntity
  ): Promise<void>
  updateOneByUuid(
    uuid: string,
    subscriptionEntity: Omit<SubscriptionEntity, 'uuid' | 'createdAt'>
  ): Promise<void>
}
