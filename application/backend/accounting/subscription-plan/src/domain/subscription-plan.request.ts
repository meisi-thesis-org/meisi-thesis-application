import { type SubscriptionPlanEntity } from './subscription-plan.domain';

type FindSubscritionPlanByUuidRequest =
    Readonly<Pick<SubscriptionPlanEntity, 'uuid'>>;
type CreateSubscritionPlanRequest =
    Readonly<Pick<SubscriptionPlanEntity, 'designation' | 'description' | 'price'>>;
type UpdateSubscriptionPlanByUuidRequest =
    Readonly<Pick<SubscriptionPlanEntity, 'uuid'>> &
    Partial<Readonly<Omit<SubscriptionPlanEntity, 'createdAt' | 'updatedAt'>>>;

export type {
  FindSubscritionPlanByUuidRequest,
  CreateSubscritionPlanRequest,
  UpdateSubscriptionPlanByUuidRequest
}
