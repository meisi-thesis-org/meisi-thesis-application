import { type BookEntity } from './book.domain';

type FindBooksByQueryRequest = Readonly<Partial<Pick<BookEntity, 'dossierUuid'>>>
type FindBookByUuidRequest = Readonly<Pick<BookEntity, 'uuid'>>
type CreateBookRequest = Readonly<Pick<BookEntity, 'dossierUuid' | 'designation' | 'description' | 'price'>>
type UpdateBookByUuidRequest =
  Readonly<Pick<BookEntity, 'uuid'>> &
  Partial<Pick<BookEntity, 'designation' | 'description' | 'price' | 'visible' | 'active'>>

export type {
  FindBookByUuidRequest,
  FindBooksByQueryRequest,
  CreateBookRequest,
  UpdateBookByUuidRequest
}
