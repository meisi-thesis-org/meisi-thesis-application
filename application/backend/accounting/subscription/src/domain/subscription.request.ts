import { type SubscriptionEntity } from './subscription.domain';

type FindSubscriptionByUuidRequest = Pick<SubscriptionEntity, 'uuid'>;
type CreateSubscriptionRequest = Readonly<Pick<SubscriptionEntity, 'userUuid' | 'subscriptionPlanUuid'>>;
type UpdateSubscriptionByUuidRequest =
    Readonly<Pick<SubscriptionEntity, 'uuid'>> &
    Partial<Readonly<Omit<SubscriptionEntity, 'createdAt' | 'updatedAt'>>>;

export type {
  FindSubscriptionByUuidRequest,
  CreateSubscriptionRequest,
  UpdateSubscriptionByUuidRequest
}
