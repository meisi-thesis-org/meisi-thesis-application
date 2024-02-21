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

  async findChapterByProps (bookUuid: string, designation: string): Promise<ChapterEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<ChapterEntity>({
        name: 'find-chapter-by-props',
        text: 'SELECT * FROM chapters WHERE chapters.bookUuid = $1 AND chapters.designation = $2',
        values: [bookUuid, designation]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findChaptersByQuery (bookUuid?: string | undefined): Promise<ChapterEntity[]> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<ChapterEntity>({
        name: 'find-chapters-by-query',
        text: 'SELECT * FROM chapters WHERE chapters.bookUuid = $1',
        values: [bookUuid]
      });

      if (result.rowCount === 0) {
        const chapters = await this.provider.query<ChapterEntity>({
          name: 'find-chapters',
          text: 'SELECT * FROM chapters'
        });

        return chapters.rows;
      }

      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  async findChapterByUuid (uuid: string): Promise<ChapterEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<ChapterEntity>({
        name: 'find-chapter-by-uuid',
        text: 'SELECT * FROM chapters WHERE chapters.uuid = $1',
        values: [uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async createChapter (data: ChapterEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<ChapterEntity>({
        name: 'create-chapter',
        text: 'INSERT INTO chapters ("uuid", "bookUuid", "designation", "description", "price", "visible", "active", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [data.uuid, data.bookUuid, data.designation, data.description, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updateChapterByUuid (uuid: string, data: ChapterEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<ChapterEntity>({
        name: 'update-chapter-by-uuid',
        text: 'UPDATE chapters SET chapters.designation = $1, chapters.description = $2, chapters.price = $3, chapters.visible = $4, chapters.active = $5, chapters.updatedAt = $6 WHERE chapters.uuid = $5',
        values: [data.designation, data.description, data.price, data.visible, data.active, data.updatedAt, uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
