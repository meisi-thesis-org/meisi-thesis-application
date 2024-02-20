import { type PageEntity } from './structs/page.domain';

export interface PageRepository {
  findPageByUuid(
    entity: NonNullable<Pick<PageEntity, 'uuid'>>
  ): Promise<PageEntity | undefined>
  findPagesByQuery(
    entity: Partial<Pick<PageEntity, 'chapterUuid'>>
  ): Promise<PageEntity[]>
  createPage(
    entity: PageEntity
  ): Promise<void>
  updatePageByUuid(
    entity: PageEntity
  ): Promise<void>
}
