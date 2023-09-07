type ChapterEntity = {
  readonly uuid: string
  readonly bookUuid: string
  designation: string
  description: string
  visible: boolean
  active: boolean
  readonly createdAt: string
  updatedAt: string
}
type ChapterDTO = Readonly<ChapterEntity>
const chapterMapper = (chapterEntity: ChapterEntity): ChapterDTO => {
  return {
    uuid: chapterEntity.uuid,
    bookUuid: chapterEntity.bookUuid,
    designation: chapterEntity.designation,
    description: chapterEntity.description,
    visible: chapterEntity.visible,
    active: chapterEntity.active,
    createdAt: chapterEntity.createdAt,
    updatedAt: chapterEntity.updatedAt
  }
}

export {
  type ChapterEntity,
  type ChapterDTO,
  chapterMapper
}
