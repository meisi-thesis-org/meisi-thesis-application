import { Client } from 'pg';
import { type PageRepository } from '../page.repository';
import { type PageEntity } from '../structs/page.domain';

export class PageRemoteRepository implements PageRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  public constructor() {
    this.provider.connect();
  }

  async findPageByUuid(
    entity: NonNullable<Pick<PageEntity, 'uuid'>>
  ): Promise<PageEntity | undefined> {
    const result = await this.provider.query<PageEntity>({
      name: 'find-page-by-uuid',
      text: `
        SELECT uuid, chapter_uuid as "chapterUuid", designation, description, price, active, visible, created_at as "createdAt", updated_at as "updatedAt"
        FROM pages 
        WHERE pages.uuid = $1
      `,
      values: [entity.uuid]
    });
    return result.rows[0];
  }

  async findPagesByQuery(
    entity: Partial<Pick<PageEntity, 'chapterUuid'>>
  ): Promise<PageEntity[]> {
    const result = await this.provider.query<PageEntity>({
      name: 'find-pages-by-query',
      text: `
        SELECT uuid, chapter_uuid as "chapterUuid", designation, description, price, active, visible, created_at as "createdAt", updated_at as "updatedAt"
        FROM pages 
        WHERE pages.chapter_uuid = $1
      `,
      values: [entity.chapterUuid]
    });

    if (result.rowCount === 0) {
      const pages = await this.provider.query<PageEntity>({
        name: 'find-pages',
        text: `
          SELECT uuid, chapter_uuid as "chapterUuid", designation, description, price, active, visible, created_at as "createdAt", updated_at as "updatedAt"
          FROM pages 
        `,
      });

      return pages.rows;
    }

    return result.rows;
  }

  async createPage(data: PageEntity): Promise<void> {
    await this.provider.query<PageEntity>({
      name: 'create-page',
      text: `
        INSERT INTO pages ("uuid", "chapter_uuid", "designation", "description", "price", "visible", "active", "created_at", "updated_at") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      values: [data.uuid, data.chapterUuid, data.designation, data.description, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
    });
  }

  async updatePageByUuid(entity: PageEntity): Promise<void> {
    await this.provider.query<PageEntity>({
      name: 'update-page-by-uuid',
      text: `
        UPDATE pages SET pages.designation = $1, pages.description = $2, pages.price = $3, pages.visible = $4, pages.active = $5, pages.updated_at = $6 
        WHERE pages.uuid = $5
      `,
      values: [entity.designation, entity.description, entity.price, entity.visible, entity.active, entity.updatedAt, entity.uuid]
    });
  }
}
