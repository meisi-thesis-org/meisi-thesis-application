import { type BookEntity } from './book.domain';

type FindBooksByDossierUuidRequest = Pick<BookEntity, 'dossierUuid'>
type FindBookByUuidRequest = Pick<BookEntity, 'uuid'>
type CreateBookRequest = Readonly<Pick<BookEntity, 'dossierUuid' | 'designation' | 'description'>>
type UpdateBookByUuidRequest =
  Readonly<Pick<BookEntity, 'uuid'>> &
  Pick<BookEntity, 'designation' | 'description' | 'visible' | 'active'>

export type {
  FindBookByUuidRequest,
  FindBooksByDossierUuidRequest,
  CreateBookRequest,
  UpdateBookByUuidRequest
}
