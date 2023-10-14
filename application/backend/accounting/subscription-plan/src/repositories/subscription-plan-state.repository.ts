import { type SubscriptionPlanEntity } from '../domain/subscription-plan.domain';
import { type SubscriptionPlanRepository } from '../subscription-plan.repository';

export class SubscriptionPlanStateRepository implements SubscriptionPlanRepository {
  private readonly subscriptionPlans: SubscriptionPlanEntity[] = [];

  public async findBulk (): Promise<SubscriptionPlanEntity[]> {
    return this.subscriptionPlans;
  }

  public async findOneByUuid (
    uuid: string
  ): Promise<SubscriptionPlanEntity | undefined> {
    return this.subscriptionPlans.find((subscriptionPlan) => subscriptionPlan.uuid === uuid);
  }

  public async findOneByDesignation (designation: string): Promise<SubscriptionPlanEntity | undefined> {
    return this.subscriptionPlans.find((subscriptionPlan) => subscriptionPlan.designation === designation);
  }

  public async createOne (
    subscriptionPlanEntity: SubscriptionPlanEntity
  ): Promise<void> {
    this.subscriptionPlans.push(subscriptionPlanEntity);
  }

  public async updateOneByUuid (
    uuid: string,
    subscriptionPlanEntity: Omit<SubscriptionPlanEntity, 'uuid' | 'createdAt'>
  ): Promise<void> {
    this.subscriptionPlans.find((subscriptionPlan) => {
      if (subscriptionPlan.uuid === uuid) {
        subscriptionPlan = { ...subscriptionPlan, ...subscriptionPlanEntity }
      }

      return subscriptionPlan;
    });
  }
}
