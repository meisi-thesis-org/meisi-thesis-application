import { type PageEntity } from './page.domain'

type FindPageByUuidRequest = Readonly<NonNullable<Pick<PageEntity, 'uuid'>>>
type FindPagesByQueryRequest = Readonly<Partial<Pick<PageEntity, 'chapterUuid'>>>
type CreatePageRequest = Readonly<NonNullable<Pick<PageEntity, 'chapterUuid' | 'designation' | 'description' | 'price'>>>
type UpdatePageByUuidRequest =
    NonNullable<Pick<PageEntity, 'uuid'>> &
    Readonly<Partial<Pick<PageEntity, 'designation' | 'description' | 'price' | 'visible' | 'active'>>>

export type { FindPageByUuidRequest, FindPagesByQueryRequest, CreatePageRequest, UpdatePageByUuidRequest }
