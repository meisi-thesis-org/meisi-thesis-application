import { type SubscriptionEntity } from '../domain/subscription.domain';
import { type SubscriptionRepository } from '../subscription.repository';

export class SubscriptionStateRepository implements SubscriptionRepository {
  private readonly subscriptions: SubscriptionEntity[] = [];

  public async findOneByUuid (
    uuid: string
  ): Promise<SubscriptionEntity | undefined> {
    return this.subscriptions.find((subscription) => subscription.uuid === uuid);
  }

  public async findOneByUserSubscriptionPlan (
    subscriptionEntity: Pick<SubscriptionEntity, 'userUuid' | 'subscriptionPlanUuid'>
  ): Promise<SubscriptionEntity | undefined> {
    return this.subscriptions.find((subscription) =>
      subscription.userUuid === subscriptionEntity.userUuid &&
        subscription.subscriptionPlanUuid === subscriptionEntity.subscriptionPlanUuid
    );
  }

  public async createOne (
    subscriptionEntity: SubscriptionEntity
  ): Promise<void> {
    this.subscriptions.push(subscriptionEntity);
  }

  public async updateOneByUuid (
    uuid: string,
    subscriptionEntity: Omit<SubscriptionEntity, 'uuid' | 'createdAt'>
  ): Promise<void> {
    this.subscriptions.find((subscription) => {
      if (subscription.uuid === uuid) {
        subscription = { ...subscription, ...subscriptionEntity }
      }

      return subscription;
    });
  }
}
