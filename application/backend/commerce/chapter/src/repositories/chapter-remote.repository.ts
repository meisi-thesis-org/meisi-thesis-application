import { Client } from 'pg';
import { type ChapterRepository } from '../chapter.repository';
import { type ChapterEntity } from '../structs/chapter.domain';

export class ChapterRemoteRepository implements ChapterRepository {
  private readonly provider: Client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
  })

  public constructor() {
    this.provider.connect()
  }

  async findChapterByProps (bookUuid: string, designation: string): Promise<ChapterEntity | undefined> {
    const result = await this.provider.query<ChapterEntity>({
      name: 'find-chapter-by-props',
      text: `
        SELECT uuid, book_uuid as "bookUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM chapters 
        WHERE chapters.book_uuid = $1 AND chapters.designation = $2
      `,
      values: [bookUuid, designation]
    });
    return result.rows[0];
  }

  async findChaptersByQuery (bookUuid?: string | undefined): Promise<ChapterEntity[]> {
    const result = await this.provider.query<ChapterEntity>({
      name: 'find-chapters-by-query',
      text: `
        SELECT uuid, book_uuid as "bookUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM chapters 
        WHERE chapters.book_uuid = $1
      `,
      values: [bookUuid]
    });

    if (result.rowCount === 0) {
      const chapters = await this.provider.query<ChapterEntity>({
        name: 'find-chapters',
        text: `
          SELECT uuid, book_uuid as "bookUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
          FROM chapters 
        `
      });

      return chapters.rows;
    }

    return result.rows;
  }

  async findChapterByUuid (uuid: string): Promise<ChapterEntity | undefined> {
    const result = await this.provider.query<ChapterEntity>({
      name: 'find-chapter-by-uuid',
      text: `
        SELECT uuid, book_uuid as "bookUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM chapters
        WHERE chapters.uuid = $1
      `,
      values: [uuid]
    });
    return result.rows[0];
  }

  async createChapter (data: ChapterEntity): Promise<void> {
    await this.provider.query<ChapterEntity>({
      name: 'create-chapter',
      text: `
        INSERT INTO chapters ("uuid", "book_uuid", "designation", "description", "price", "visible", "active", "created_at", "updated_at") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `,
      values: [data.uuid, data.bookUuid, data.designation, data.description, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
    });
  }

  async updateChapterByUuid (uuid: string, data: ChapterEntity): Promise<void> {
    await this.provider.query<ChapterEntity>({
      name: 'update-chapter-by-uuid',
      text: `
        UPDATE chapters SET designation = $1, description = $2, price = $3, visible = $4, active = $5, updated_at = $6
        WHERE chapters.uuid = $5
      `,
      values: [data.designation, data.description, data.price, data.visible, data.active, data.updatedAt, uuid]
    });
  }
}
