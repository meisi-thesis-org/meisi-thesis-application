import { type SubscriptionEntity } from './subscription.domain';

type FindSubscriptionByUuidRequest =
    NonNullable<Pick<SubscriptionEntity, 'uuid'>>;
type FindSubscriptionsByForeignsUuidRequest =
    Partial<Pick<SubscriptionEntity, 'walletUuid' | 'pageUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>;
type CreateSubscriptionRequest =
    NonNullable<Pick<SubscriptionEntity, 'walletUuid'>> &
    Partial<Pick<SubscriptionEntity, 'dossierUuid' | 'bookUuid' | 'chapterUuid' | 'pageUuid'>>;
type UpdateSubscriptionByUuidRequest =
    NonNullable<Pick<SubscriptionEntity, 'uuid'>> &
    Partial<Pick<SubscriptionEntity, 'active' | 'enabled'>>;

export type {
  FindSubscriptionByUuidRequest,
  FindSubscriptionsByForeignsUuidRequest,
  CreateSubscriptionRequest,
  UpdateSubscriptionByUuidRequest
};
