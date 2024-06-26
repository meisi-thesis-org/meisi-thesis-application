import { type BookEntity } from './structs/book.domain';

export interface BookRepository {
  findBookByProps(dossierUuid: string, designation: string): Promise<BookEntity | undefined>
  findBooksByQuery(dossierUuid?: string): Promise<BookEntity[]>
  findBookByUuid(uuid: string): Promise<BookEntity | undefined>
  createBook(data: BookEntity): Promise<void>
  updateBookByUuid(
    uuid: string,
    data: Omit<BookEntity, 'uuid' | 'dossierUuid' | 'createdAt'>
  ): Promise<void>
}
