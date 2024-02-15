import { type ChapterEntity } from './chapter.domain'

type FindChaptersByBookUuidRequest = Readonly<Pick<ChapterEntity, 'bookUuid'>>
type FindChapterByUuidRequest = Readonly<Pick<ChapterEntity, 'uuid'>>
type CreateChapterRequest = Readonly<Pick<ChapterEntity, 'bookUuid' | 'designation' | 'description' | 'price'>>
type UpdateChapterByUuidRequest =
    Readonly<Pick<ChapterEntity, 'uuid'>> &
    Pick<ChapterEntity, 'designation' | 'description' | 'price' | 'visible' | 'active'>

export {
  type FindChaptersByBookUuidRequest,
  type FindChapterByUuidRequest,
  type CreateChapterRequest,
  type UpdateChapterByUuidRequest
}
