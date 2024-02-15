import { type BookEntity } from './book.domain';

type FindBooksByDossierUuidRequest = Pick<BookEntity, 'dossierUuid'>
type FindBookByUuidRequest = Pick<BookEntity, 'uuid'>
type CreateBookRequest = Readonly<Pick<BookEntity, 'dossierUuid' | 'designation' | 'description' | 'price'>>
type UpdateBookByUuidRequest =
  Readonly<Pick<BookEntity, 'uuid'>> &
  Pick<BookEntity, 'designation' | 'description' | 'price' | 'visible' | 'active'>

export type {
  FindBookByUuidRequest,
  FindBooksByDossierUuidRequest,
  CreateBookRequest,
  UpdateBookByUuidRequest
}
