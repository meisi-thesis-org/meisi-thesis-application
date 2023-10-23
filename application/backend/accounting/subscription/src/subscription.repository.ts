import { type SubscriptionEntity } from './structs/subscription.domain';

export interface SubscriptionRepository {
  findSubscriptionByUuid(
    entity: NonNullable<Pick<SubscriptionEntity, 'uuid'>>
  ): Promise<SubscriptionEntity | undefined>
  findSubscriptionsByForeignsUuid(
    entity: Partial<Pick<SubscriptionEntity, 'walletUuid' | 'pageUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<SubscriptionEntity[]>
  createSubscription(
    entity: SubscriptionEntity
  ): Promise<void>
  updateSubscriptionByUuid(
    entity: SubscriptionEntity
  ): Promise<void>
}
