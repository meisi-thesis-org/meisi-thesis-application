import { type PageEntity } from '../structs/page.domain';
import { type PageRepository } from '../page.repository';

export class PageStateRepository implements PageRepository {
  private readonly pages = new Array<PageEntity>();

  public async findPageByUuid (entity: Pick<PageEntity, 'uuid'>): Promise<PageEntity | undefined> {
    return this.pages.find((page) => page.uuid === entity.uuid);
  }

  public async findPagesByChapterUuid (entity: Partial<Pick<PageEntity, 'chapterUuid'>>): Promise<PageEntity[]> {
    return this.pages.filter((page) => page.chapterUuid === entity.chapterUuid);
  }

  public async createPage (entity: PageEntity): Promise<void> {
    this.pages.push(entity);
  }

  public async updatePageByUuid (entity: PageEntity): Promise<void> {
    this.pages.filter((page) => {
      if (page.uuid === entity.uuid) {
        page = { ...page, ...entity };
      }

      return page;
    })
  }
}
