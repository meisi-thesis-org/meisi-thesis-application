import { type PromotionSubscriptionPlanEntity } from './promotion-subscription-plan.domain';

type FindPromotionSubscriptionPlanByUuidRequest = Pick<PromotionSubscriptionPlanEntity, 'uuid'>;
type FindPromotionSubscriptionPlansByForeignsUuidRequest = Pick<PromotionSubscriptionPlanEntity, 'promotionUuid' | 'subscriptionPlanUuid'>;
type CreatePromotionSubscriptionPlanRequest = Pick<PromotionSubscriptionPlanEntity, 'promotionUuid' | 'subscriptionPlanUuid'>;
type UpdatePromotionSubscriptionPlanByUuidRequest =
  Pick<PromotionSubscriptionPlanEntity, 'uuid'> &
  Partial<Pick<PromotionSubscriptionPlanEntity, 'active'>>;

export type {
  FindPromotionSubscriptionPlanByUuidRequest,
  FindPromotionSubscriptionPlansByForeignsUuidRequest,
  CreatePromotionSubscriptionPlanRequest,
  UpdatePromotionSubscriptionPlanByUuidRequest
}
