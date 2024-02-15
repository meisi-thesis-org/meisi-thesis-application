import { type PageEntity } from './page.domain'

type FindPageByUuidRequest = NonNullable<Pick<PageEntity, 'uuid'>>
type FindPageByChapterUuidRequest = NonNullable<Pick<PageEntity, 'chapterUuid'>>
type CreatePageRequest = NonNullable<Readonly<Pick<PageEntity, 'chapterUuid' | 'designation' | 'description' | 'price'>>>
type UpdatePageByUuidRequest =
    NonNullable<Pick<PageEntity, 'uuid'>> &
    Partial<Readonly<Pick<PageEntity, 'designation' | 'description' | 'price' | 'visible' | 'active'>>>

export type { FindPageByUuidRequest, FindPageByChapterUuidRequest, CreatePageRequest, UpdatePageByUuidRequest }
