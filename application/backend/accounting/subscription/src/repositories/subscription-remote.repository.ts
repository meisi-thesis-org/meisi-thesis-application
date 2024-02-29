import { Client } from 'pg';
import { type SubscriptionEntity } from '../structs/subscription.domain';
import { type SubscriptionRepository } from '../subscription.repository';

export class SubscriptionStateRepository implements SubscriptionRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  public constructor () {
    void this.provider.connect();
  }

  public async findSubscriptionByUuid (
    entity: Pick<SubscriptionEntity, 'uuid'>
  ): Promise<SubscriptionEntity | undefined> {
    const result = await this.provider.query<SubscriptionEntity>({
      name: 'find-subscription-by-uuid',
      text: `
        SELECT uuid, wallet_uuid as "walletUuid", dossier_uuid as "dossierUuid", book_uuid as "bookUuid", chapter_uuid as "chapterUuid", page_uuid as "pageUuid", active, visible, created_at as "createdAt", updated_at as "updatedAt"
        FROM subscriptions 
        WHERE subscriptions.uuid = $1
      `,
      values: [entity.uuid]
    });
    return result.rows[0];
  }

  public async findSubscriptionsByForeignsUuid (
    entity: Partial<Pick<SubscriptionEntity, 'walletUuid' | 'pageUuid' | 'chapterUuid' | 'bookUuid' | 'dossierUuid'>>
  ): Promise<SubscriptionEntity[]> {
    const queryResult = await this.provider.query<SubscriptionEntity>({
      name: 'find-subscription-by-uuid',
      text: `
        SELECT uuid, wallet_uuid as "walletUuid", dossier_uuid as "dossierUuid", book_uuid as "bookUuid", chapter_uuid as "chapterUuid", page_uuid as "pageUuid", active, visible, created_at as "createdAt", updated_at as "updatedAt"
        FROM subscriptions 
        WHERE subscriptions.wallet_uuid = $1
      `,
      values: [entity.walletUuid]
    });

    const foundByPageUuid = queryResult.rows.filter((subscription) => subscription.pageUuid === entity.pageUuid);
    const sanitizedFoundByPageUuid = foundByPageUuid.length > 0 ? foundByPageUuid : queryResult.rows;

    const foundByChapterUuid = sanitizedFoundByPageUuid.filter((subscription) => subscription.chapterUuid === entity.chapterUuid);
    const sanitizedFoundByChapterUuid = foundByChapterUuid.length > 0 ? foundByChapterUuid : sanitizedFoundByPageUuid;

    const foundByBookUuid = sanitizedFoundByChapterUuid.filter((subscription) => subscription.bookUuid === entity.bookUuid);
    const sanitizedFoundByBookUuid = foundByBookUuid.length > 0 ? foundByBookUuid : sanitizedFoundByChapterUuid;

    const foundByDossierUuid = sanitizedFoundByBookUuid.filter((subscription) => subscription.dossierUuid === entity.dossierUuid);
    const sanitizedFoundByDossierUuid = foundByDossierUuid.length > 0 ? foundByDossierUuid : sanitizedFoundByBookUuid;

    return sanitizedFoundByDossierUuid;
  }

  public async createSubscription (
    entity: SubscriptionEntity
  ): Promise<void> {
    await this.provider.query<SubscriptionEntity>({
      name: 'create-subscription',
      text: `
        INSERT INTO wallets ("uuid", "wallet_uuid", "dossier_uuid", "book_uuid", "chapter_uuid", "page_uuid", "active", "visible", "created_at", "updated_at") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `,
      values: [entity.uuid, entity.walletUuid, entity.dossierUuid, entity.bookUuid, entity.chapterUuid, entity.pageUuid, entity.active, entity.visible, entity.createdAt, entity.updatedAt]
    });
  }

  public async updateSubscriptionByUuid (
    entity: SubscriptionEntity
  ): Promise<void> {
    await this.provider.query<SubscriptionEntity>({
      name: 'update-subscriptions',
      text: 'UPDATE subscriptions SET active = $1, visible = $2, updated_at = $2 WHERE users.uuid = $4',
      values: [entity.active, entity.visible, entity.updatedAt, entity.uuid]
    });
  }
}
