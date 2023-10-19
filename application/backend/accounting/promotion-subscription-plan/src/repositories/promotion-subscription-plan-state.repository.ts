import { type PromotionSubscriptionPlanRepository } from '../promotion-subscription-plan.repository';
import { type PromotionSubscriptionPlanEntity } from '../structs/promotion-subscription-plan.domain';

export class PromotionSubscriptionPlanStateRepository implements PromotionSubscriptionPlanRepository {
  private readonly PromotionSubscriptionPlans = new Array<PromotionSubscriptionPlanEntity>();

  public async findOneByUuid (
    entity: Pick<PromotionSubscriptionPlanEntity, 'uuid'>
  ): Promise<PromotionSubscriptionPlanEntity | undefined> {
    return this.PromotionSubscriptionPlans.find((PromotionSubscriptionPlan) => PromotionSubscriptionPlan.uuid === entity.uuid);
  }

  public async findBulkByForeignsUuid (
    entity: Partial<Pick<PromotionSubscriptionPlanEntity, 'promotionUuid' | 'subscriptionPlanUuid'>>
  ): Promise<PromotionSubscriptionPlanEntity[]> {
    if (entity.subscriptionPlanUuid !== undefined && entity.promotionUuid !== undefined) {
      return this.PromotionSubscriptionPlans.filter((PromotionSubscriptionPlan) =>
        PromotionSubscriptionPlan.subscriptionPlanUuid === entity.subscriptionPlanUuid &&
        PromotionSubscriptionPlan.promotionUuid === entity.promotionUuid
      )
    }

    if (entity.subscriptionPlanUuid !== undefined) {
      return this.PromotionSubscriptionPlans.filter((PromotionSubscriptionPlan) =>
        PromotionSubscriptionPlan.subscriptionPlanUuid === entity.subscriptionPlanUuid
      )
    }

    if (entity.promotionUuid !== undefined) {
      return this.PromotionSubscriptionPlans.filter((PromotionSubscriptionPlan) =>
        PromotionSubscriptionPlan.promotionUuid === entity.promotionUuid
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
    this.PromotionSubscriptionPlans.filter((PromotionSubscriptionPlan) => {
      if (PromotionSubscriptionPlan.uuid === entity.uuid) {
        PromotionSubscriptionPlan = { ...PromotionSubscriptionPlan, ...entity };
      }

      return PromotionSubscriptionPlan
    })
  }
}
