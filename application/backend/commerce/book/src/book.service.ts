import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type BookRepository } from './book.repository';
import { type UpdateBookByUuidRequest, type CreateBookRequest, type FindBookByUuidRequest, type FindBooksByQueryRequest } from './structs/book.request';
import { type BookDTO, bookMapper, type BookEntity } from './structs/book.domain';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { BookStateRepository } from './repositories/book-state.repository';

export class BookService {
  private readonly repository: BookRepository = new BookStateRepository();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findBooksByQuery (
    findBooksByQueryRequest: FindBooksByQueryRequest
  ): Promise<BookDTO[]> {
    const foundBooks = await this.repository
      .findBooksByQuery(findBooksByQueryRequest.dossierUuid)
      .catch(() => { throw new InternalServerException(); })

    const mappedBooks = new Array<BookDTO>();

    for (const foundBook of foundBooks) {
      mappedBooks.push(bookMapper(foundBook));
    }

    return mappedBooks;
  }

  public async findBookByUuid (
    findBookByUuidRequest: FindBookByUuidRequest
  ): Promise<BookDTO> {
    const foundBook = await this.repository
      .findBookByUuid(findBookByUuidRequest.uuid)
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundBook === undefined) throw new NonFoundException()

    return bookMapper(foundBook);
  }

  public async createBook (
    createBookRequest: CreateBookRequest,
    options?: Record<string, string>
  ): Promise<BookDTO> {
    const foundBook = await this.repository
      .findBookByProps(
        createBookRequest.dossierUuid,
        createBookRequest.designation
      )
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundBook !== undefined) throw new ConflictException()

    await this.networkProvider.doHttpRequest(
      '8000',
      `commerce/dossiers/${createBookRequest.dossierUuid}`,
      'GET',
      { authorization: options?.authorization ?? '' }
    )

    const toCreateBook: BookEntity = {
      uuid: this.randomProvider.randomUUID(),
      dossierUuid: createBookRequest.dossierUuid,
      designation: createBookRequest.designation,
      description: createBookRequest.description,
      price: createBookRequest.price,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await this.repository.createBook(toCreateBook).catch(() => {
      throw new InternalServerException();
    })

    return bookMapper(toCreateBook);
  }

  public async updateBookByUuid (
    updateBookByUuidRequest: UpdateBookByUuidRequest
  ): Promise<BookDTO> {
    const foundBook = await this.repository
      .findBookByUuid(updateBookByUuidRequest.uuid)
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundBook === undefined) throw new NonFoundException()

    const toUpdateBook: Omit<BookEntity, 'uuid' | 'dossierUuid' | 'createdAt'> = {
      designation: updateBookByUuidRequest.designation ?? foundBook.designation,
      description: updateBookByUuidRequest.description ?? foundBook.description,
      price: updateBookByUuidRequest.price ?? foundBook.price,
      visible: updateBookByUuidRequest.visible ?? foundBook.visible,
      active: updateBookByUuidRequest.active ?? foundBook.active,
      updatedAt: new Date().toISOString()
    }

    const updatedBook = await this.repository
      .updateBookByUuid(updateBookByUuidRequest.uuid, toUpdateBook)
      .catch(() => {
        throw new InternalServerException();
      })

    if (updatedBook === undefined) throw new NonFoundException()

    return bookMapper(updatedBook);
  }
}
