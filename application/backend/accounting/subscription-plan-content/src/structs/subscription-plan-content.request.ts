import { type SubscriptionPlanContentDTO } from './subscription-plan-content.domain';

type FindSubscriptionPlanContentByUuidRequest = Pick<SubscriptionPlanContentDTO, 'uuid'>;
type FindSubscriptionPlanContentByForeignsUuidRequest = Pick<SubscriptionPlanContentDTO, 'subscriptionPlanUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>;
type CreateSubscriptionPlanContentRequest = Pick<SubscriptionPlanContentDTO, 'subscriptionPlanUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>;
type UpdateSubscriptionPlanContentByUuidRequest =
  Pick<SubscriptionPlanContentDTO, 'uuid'> &
  Partial<Pick<SubscriptionPlanContentDTO, 'active'>>;

export type {
  FindSubscriptionPlanContentByUuidRequest,
  FindSubscriptionPlanContentByForeignsUuidRequest,
  CreateSubscriptionPlanContentRequest,
  UpdateSubscriptionPlanContentByUuidRequest
}
