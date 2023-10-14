import { type SubscriptionPlanEntity } from './domain/subscription-plan.domain'

export interface SubscriptionPlanRepository {
  findBulk(
  ): Promise<SubscriptionPlanEntity[]>
  findOneByUuid(
    uuid: string
  ): Promise<SubscriptionPlanEntity | undefined>
  findOneByDesignation(
    designation: string
  ): Promise<SubscriptionPlanEntity | undefined>
  createOne(
    subscriptionPlanEntity: SubscriptionPlanEntity
  ): Promise<void>
  updateOneByUuid(
    uuid: string,
    subscriptionPlanEntity: Omit<SubscriptionPlanEntity, 'uuid' | 'createdAt'>
  ): Promise<void>
}
