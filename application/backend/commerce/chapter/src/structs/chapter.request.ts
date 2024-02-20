import { type ChapterEntity } from './chapter.domain'

type FindChaptersByQueryRequest = Readonly<Partial<Pick<ChapterEntity, 'bookUuid'>>>
type FindChapterByUuidRequest = Readonly<Pick<ChapterEntity, 'uuid'>>
type CreateChapterRequest = Readonly<Pick<ChapterEntity, 'bookUuid' | 'designation' | 'description' | 'price'>>
type UpdateChapterByUuidRequest =
    Readonly<Pick<ChapterEntity, 'uuid'>> &
    Partial<Pick<ChapterEntity, 'designation' | 'description' | 'price' | 'visible' | 'active'>>

export {
  type FindChaptersByQueryRequest,
  type FindChapterByUuidRequest,
  type CreateChapterRequest,
  type UpdateChapterByUuidRequest
}
