import { type PageEntity } from './page.domain'

type FindPageByUuidRequest = NonNullable<Pick<PageEntity, 'uuid'>>
type FindPageByChapterUuidRequest = NonNullable<Pick<PageEntity, 'chapterUuid'>>
type CreatePageRequest = NonNullable<Readonly<Pick<PageEntity, 'chapterUuid' | 'description'>>>
type UpdatePageByUuidRequest =
    NonNullable<Pick<PageEntity, 'uuid'>> &
    Partial<Readonly<Pick<PageEntity, 'description' | 'active' | 'enabled'>>>

export type { FindPageByUuidRequest, FindPageByChapterUuidRequest, CreatePageRequest, UpdatePageByUuidRequest }
