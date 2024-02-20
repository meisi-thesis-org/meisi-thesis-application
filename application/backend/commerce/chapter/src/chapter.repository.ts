import { type ChapterEntity } from './structs/chapter.domain'

export interface ChapterRepository {
  findChapterByProps(bookUuid: string, designation: string): Promise<ChapterEntity | undefined>
  findChaptersByQuery(bookUuid?: string): Promise<ChapterEntity[]>
  findChapterByUuid(uuid: string): Promise<ChapterEntity | undefined>
  createChapter(data: ChapterEntity): Promise<void>
  updateChapterByUuid(
    uuid: string,
    data: ChapterEntity
  ): Promise<void>
}
