import { type PromotionSubscriptionPlanEntity } from './structs/subscription-plan-content.domain';

export interface PromotionSubscriptionPlanRepository {
  findOneByUuid(
    entity: Pick<PromotionSubscriptionPlanEntity, 'uuid'>
  ): Promise<PromotionSubscriptionPlanEntity | undefined>
  findBulkByForeignsUuid(
    entity: Partial<Pick<PromotionSubscriptionPlanEntity, 'promotionUuid' | 'subscriptionPlanUuid'>>
  ): Promise<PromotionSubscriptionPlanEntity[]>
  createOne(
    entity: PromotionSubscriptionPlanEntity
  ): Promise<void>
  updateOneByUuid(
    entity: Pick<PromotionSubscriptionPlanEntity, 'uuid' | 'active'>
  ): Promise<void>
}
