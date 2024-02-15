type BookEntity = {
  readonly uuid: string
  readonly dossierUuid: string
  designation: string
  description: string
  price: number
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}
type BookDTO = Readonly<BookEntity>

const bookMapper = (bookEntity: BookEntity): BookDTO => {
  return {
    uuid: bookEntity.uuid,
    dossierUuid: bookEntity.dossierUuid,
    designation: bookEntity.designation,
    description: bookEntity.description,
    price: bookEntity.price,
    visible: bookEntity.visible,
    active: bookEntity.active,
    createdAt: bookEntity.createdAt,
    updatedAt: bookEntity.updatedAt
  }
}

export {
  type BookEntity,
  type BookDTO,
  bookMapper
}
