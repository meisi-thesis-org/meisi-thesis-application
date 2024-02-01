type PageEntity = {
  readonly uuid: string
  readonly chapterUuid: string
  description: string
  active: boolean
  visible: boolean
  readonly createdAt: string
  updatedAt: string
}
type PageDTO = Readonly<PageEntity>
const pageMapper = (entity: PageEntity): PageDTO => ({
  uuid: entity.uuid,
  chapterUuid: entity.chapterUuid,
  description: entity.description,
  active: entity.active,
  visible: entity.visible,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt
})

export { type PageEntity, type PageDTO, pageMapper };
