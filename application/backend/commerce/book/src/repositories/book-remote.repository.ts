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

  async findBookByProps (
    dossierUuid: string,
    designation: string
  ): Promise<BookEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<BookEntity>({
        name: 'find-book-by-props',
        text: 'SELECT * FROM books WHERE books.dossierUuid = $1 AND books.designation = $2',
        values: [dossierUuid, designation]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async findBooksByQuery (dossierUuid?: string | undefined): Promise<BookEntity[]> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<BookEntity>({
        name: 'find-books-by-query',
        text: 'SELECT * FROM books WHERE books.bookUuid = $1',
        values: [dossierUuid]
      });

      if (result.rowCount === 0) {
        const books = await this.provider.query<BookEntity>({
          name: 'find-books',
          text: 'SELECT * FROM books'
        });

        return books.rows;
      }

      return result.rows;
    } finally {
      await this.provider.end();
    }
  }

  async findBookByUuid (
    uuid: string
  ): Promise<BookEntity | undefined> {
    try {
      await this.provider.connect();
      const result = await this.provider.query<BookEntity>({
        name: 'find-book-by-uuid',
        text: 'SELECT * FROM books WHERE books.uuid = $1',
        values: [uuid]
      });
      return result.rows[0];
    } finally {
      await this.provider.end();
    }
  }

  async createBook (data: BookEntity): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<BookEntity>({
        name: 'create-book',
        text: 'INSERT INTO books ("uuid", "dossierUuid", "designation", "description", "price", "visible", "active", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        values: [data.uuid, data.dossierUuid, data.designation, data.description, data.price, data.visible, data.active, data.createdAt, data.updatedAt]
      });
    } finally {
      await this.provider.end();
    }
  }

  async updateBookByUuid (
    uuid: string,
    data: Omit<BookEntity, 'uuid' | 'dossierUuid' | 'createdAt'>
  ): Promise<void> {
    try {
      await this.provider.connect();
      await this.provider.query<BookEntity>({
        name: 'update-book-by-uuid',
        text: 'UPDATE books SET books.designation = $1, books.description = $2, books.price = $3, books.visible = $4, books.active = $5, books.updatedAt = $6 WHERE books.uuid = $5',
        values: [data.designation, data.description, data.price, data.visible, data.active, data.updatedAt, uuid]
      });
    } finally {
      await this.provider.end();
    }
  }
}
