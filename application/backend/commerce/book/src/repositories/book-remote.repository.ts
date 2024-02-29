import { Client } from 'pg';
import { type BookRepository } from '../book.repository';
import { type BookEntity } from '../structs/book.domain';

export class BookRemoteRepository implements BookRepository {
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

  async findBookByProps (
    dossierUuid: string,
    designation: string
  ): Promise<BookEntity | undefined> {
    const result = await this.provider.query<BookEntity>({
      name: 'find-book-by-props',
      text: `
        SELECT uuid, dossier_uuid as "dossierUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM books 
        WHERE books.dossier_uuid = $1 AND books.designation = $2
      `,
      values: [dossierUuid, designation]
    });
    return result.rows[0];
  }

  async findBooksByQuery (dossierUuid?: string | undefined): Promise<BookEntity[]> {
    const result = await this.provider.query<BookEntity>({
      name: 'find-books-by-query',
      text: `
        SELECT uuid, dossier_uuid as "dossierUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM books 
        WHERE books.dossier_uuid = $1
      `,
      values: [dossierUuid]
    });

    if (result.rowCount === 0) {
      const books = await this.provider.query<BookEntity>({
        name: 'find-books',
        text: `
          SELECT uuid, dossier_uuid as "dossierUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
          FROM books
        `
      });

      return books.rows;
    }

    return result.rows;
  }

  async findBookByUuid (
    uuid: string
  ): Promise<BookEntity | undefined> {
    const result = await this.provider.query<BookEntity>({
      name: 'find-book-by-uuid',
      text: `
        SELECT uuid, dossier_uuid as "dossierUuid", designation, description, price, visible, active, created_at as "createdAt", updated_at as "updatedAt" 
        FROM books 
        WHERE books.uuid = $1
      `,
      values: [uuid]
    });
    return result.rows[0];
  }

  async createBook (data: BookEntity): Promise<void> {
    await this.provider.query<BookEntity>({
      name: 'create-book',
      text: 'INSERT INTO books ("uuid", "dossier_uuid", "designation", "description", "price", "visible", "active", "created_at", "updated_at") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      values: [data.uuid, data.dossierUuid, data.designation, data.description, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
    });
  }

  async updateBookByUuid (
    uuid: string,
    data: Omit<BookEntity, 'uuid' | 'dossierUuid' | 'createdAt'>
  ): Promise<void> {
    await this.provider.query<BookEntity>({
      name: 'update-book-by-uuid',
      text: 'UPDATE books SET designation = $1, description = $2, price = $3, visible = $4, active = $5, updated_at = $6 WHERE books.uuid = $5',
      values: [data.designation, data.description, data.price, data.visible, data.active, data.updatedAt, uuid]
    });
  }
}
