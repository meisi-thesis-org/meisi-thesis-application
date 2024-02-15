type PageEntity = {
  readonly uuid: string
  readonly chapterUuid: string
  designation: string
  description: string
  price: number
  active: boolean
  visible: boolean
  readonly createdAt: string
  updatedAt: string
}
type PageDTO = Readonly<PageEntity>
const pageMapper = (entity: PageEntity): PageDTO => ({
  uuid: entity.uuid,
  chapterUuid: entity.chapterUuid,
  designation: entity.designation,
  description: entity.description,
  price: entity.price,
  active: entity.active,
  visible: entity.visible,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt
})

export { type PageEntity, type PageDTO, pageMapper };
