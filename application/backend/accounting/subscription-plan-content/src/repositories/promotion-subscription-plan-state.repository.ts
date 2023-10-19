import { type PromotionSubscriptionPlanRepository } from '../promotion-subscription-plan.repository';
import { type PromotionSubscriptionPlanEntity } from '../structs/subscription-plan-content.domain';

export class PromotionSubscriptionPlanStateRepository implements PromotionSubscriptionPlanRepository {
  private readonly PromotionSubscriptionPlans = new Array<PromotionSubscriptionPlanEntity>();

  public async findOneByUuid (
    entity: Pick<PromotionSubscriptionPlanEntity, 'uuid'>
  ): Promise<PromotionSubscriptionPlanEntity | undefined> {
    return this.PromotionSubscriptionPlans.find((subscriptionPlanContent) => subscriptionPlanContent.uuid === entity.uuid);
  }

  public async findBulkByForeignsUuid (
    entity: Partial<Pick<PromotionSubscriptionPlanEntity, 'promotionUuid' | 'subscriptionPlanUuid'>>
  ): Promise<PromotionSubscriptionPlanEntity[]> {
    if (entity.subscriptionPlanUuid !== undefined && entity.promotionUuid !== undefined) {
      return this.PromotionSubscriptionPlans.filter((subscriptionPlanContent) =>
        subscriptionPlanContent.subscriptionPlanUuid === entity.subscriptionPlanUuid &&
        subscriptionPlanContent.promotionUuid === entity.promotionUuid && 
      )
    }

    if (entity.subscriptionPlanUuid !== undefined) {
      return this.PromotionSubscriptionPlans.filter((subscriptionPlanContent) =>
        subscriptionPlanContent.subscriptionPlanUuid === entity.subscriptionPlanUuid
      )
    }

    if (entity.promotionUuid !== undefined) {
      return this.PromotionSubscriptionPlans.filter((subscriptionPlanContent) =>
        subscriptionPlanContent.promotionUuid === entity.promotionUuid
      )
    }

    return []
  }

  public async createOne (
    entity: PromotionSubscriptionPlanEntity
  ): Promise<void> {
    this.PromotionSubscriptionPlans.push(entity);
  }

  public async updateOneByUuid (
    entity: Pick<PromotionSubscriptionPlanEntity, 'uuid' | 'active'>
  ): Promise<void> {
    this.PromotionSubscriptionPlans.filter((subscriptionPlanContent) => {
      if (subscriptionPlanContent.uuid === entity.uuid) {
        subscriptionPlanContent = { ...subscriptionPlanContent, ...entity };
      }

      return subscriptionPlanContent
    })
  }
}
