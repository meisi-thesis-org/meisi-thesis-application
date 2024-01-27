import { type BookRepository } from '../book.repository';
import { type BookEntity } from '../structs/book.domain';

export class BookStateRepository implements BookRepository {
  private readonly bookCollection = new Array<BookEntity>();

  public async findBookByProps (
    dossierUuid: string,
    designation: string
  ): Promise<BookEntity | undefined> {
    return this.bookCollection.find((book) =>
      book.dossierUuid === dossierUuid && book.designation === designation
    );
  }

  public async findBooksByDossierUuid (
    dossierUuid: string
  ): Promise<BookEntity[]> {
    return this.bookCollection.filter((book) => book.dossierUuid === dossierUuid);
  }

  public async findBookByUuid (
    uuid: string
  ): Promise<BookEntity | undefined> {
    return this.bookCollection.find((book) => book.uuid === uuid);
  }

  public async createBook (
    data: BookEntity
  ): Promise<void> {
    this.bookCollection.push(data);
  }

  public async updateBookByUuid (
    uuid: string,
    data: Omit<BookEntity, 'uuid' | 'dossierUuid' | 'createdAt'>
  ): Promise<BookEntity | undefined> {
    return this.bookCollection.find((book) => {
      if (book.uuid === uuid) {
        book.designation = data.designation
        book.description = data.description
        book.active = data.active
        book.visible = data.visible
      }

      return book;
    })
  }
}
