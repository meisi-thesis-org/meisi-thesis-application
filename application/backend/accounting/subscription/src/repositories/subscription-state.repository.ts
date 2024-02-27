import { type SubscriptionEntity } from '../structs/subscription.domain';
import { type SubscriptionRepository } from '../subscription.repository';

export class SubscriptionStateRepository implements SubscriptionRepository {
  private subscriptions = new Array<SubscriptionEntity>();

  public async findSubscriptionByUuid (entity: Pick<SubscriptionEntity, 'uuid'>): Promise<SubscriptionEntity | undefined> {
    return this.subscriptions.find((subscription) => subscription.uuid === entity.uuid);
  }

  public async findSubscriptionsByForeignsUuid (entity: Partial<Pick<SubscriptionEntity, 'walletUuid' | 'pageUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>): Promise<SubscriptionEntity[]> {
    const foundByWalletUuid = this.subscriptions.filter((subscription) => subscription.walletUuid === entity.walletUuid);
    const sanitizedFoundByWalletUuid = foundByWalletUuid.length > 0 ? foundByWalletUuid : this.subscriptions;

    const foundByPageUuid = sanitizedFoundByWalletUuid.filter((subscription) => subscription.pageUuid === entity.pageUuid);
    const sanitizedFoundByPageUuid = foundByPageUuid.length > 0 ? foundByPageUuid : sanitizedFoundByWalletUuid;

    const foundByChapterUuid = sanitizedFoundByPageUuid.filter((subscription) => subscription.chapterUuid === entity.chapterUuid);
    const sanitizedFoundByChapterUuid = foundByChapterUuid.length > 0 ? foundByChapterUuid : sanitizedFoundByPageUuid;

    const foundByBookUuid = sanitizedFoundByChapterUuid.filter((subscription) => subscription.bookUuid === entity.bookUuid);
    const sanitizedFoundByBookUuid = foundByBookUuid.length > 0 ? foundByBookUuid : sanitizedFoundByChapterUuid;

    const foundByDossierUuid = sanitizedFoundByBookUuid.filter((subscription) => subscription.dossierUuid === entity.dossierUuid);
    const sanitizedFoundByDossierUuid = foundByDossierUuid.length > 0 ? foundByDossierUuid : sanitizedFoundByBookUuid;

    return sanitizedFoundByDossierUuid;
  }

  public async createSubscription (entity: SubscriptionEntity): Promise<void> {
    this.subscriptions.push(entity);
  }

  public async updateSubscriptionByUuid (entity: SubscriptionEntity): Promise<void> {
    this.subscriptions = this.subscriptions.map((subscription) => {
      if (subscription.uuid === entity.uuid) {
        subscription = { ...subscription, ...entity };
      }

      return subscription;
    })
  }
}
