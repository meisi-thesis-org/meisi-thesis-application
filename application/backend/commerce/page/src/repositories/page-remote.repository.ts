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

  async findPageByUuid (
    entity: NonNullable<Pick<PageEntity, 'uuid'>>
  ): Promise<PageEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<PageEntity>({
        name: 'find-page-by-uuid',
        text: 'SELECT * FROM pages WHERE pages.uuid = $1',
        values: [entity.uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findPagesByQuery (
    entity: Partial<Pick<PageEntity, 'chapterUuid'>>
  ): Promise<PageEntity[]> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<PageEntity>({
        name: 'find-pages-by-query',
        text: 'SELECT * FROM pages WHERE pages.chapterUuid = $1',
        values: [entity.chapterUuid]
      });

      if (result.rowCount === 0) {
        const pages = await this.provider.query<PageEntity>({
          name: 'find-pages',
          text: 'SELECT * FROM pages'
        });

        return pages.rows;
      }

      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  async createPage (data: PageEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<PageEntity>({
        name: 'create-page',
        text: 'INSERT INTO pages ("uuid", "chapterUuid", "designation", "description", "price", "visible", "active", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [data.uuid, data.chapterUuid, data.designation, data.description, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updatePageByUuid (entity: PageEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<PageEntity>({
        name: 'update-page-by-uuid',
        text: 'UPDATE pages SET pages.designation = $1, pages.description = $2, pages.price = $3, pages.visible = $4, pages.active = $5, pages.updatedAt = $6 WHERE pages.uuid = $5',
        values: [entity.designation, entity.description, entity.price, entity.visible, entity.active, entity.updatedAt, entity.uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
