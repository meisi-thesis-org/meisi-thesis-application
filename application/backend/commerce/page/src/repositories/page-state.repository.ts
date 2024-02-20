import { type PageEntity } from '../structs/page.domain';
import { type PageRepository } from '../page.repository';

export class PageStateRepository implements PageRepository {
  private readonly pages = new Array<PageEntity>();

  public async findPageByUuid (entity: Pick<PageEntity, 'uuid'>): Promise<PageEntity | undefined> {
    return this.pages.find((page) => page.uuid === entity.uuid);
  }

  public async findPagesByQuery (entity: Partial<Pick<PageEntity, 'chapterUuid'>>): Promise<PageEntity[]> {
    const pages = this.pages.filter((page) => page.chapterUuid === entity.chapterUuid);
    return pages.length > 0 ? pages : this.pages;
  }

  public async createPage (entity: PageEntity): Promise<void> {
    this.pages.push(entity);
  }

  public async updatePageByUuid (entity: PageEntity): Promise<void> {
    this.pages.map((page) => {
      if (page.uuid === entity.uuid) {
        page.designation = entity.designation;
        page.description = entity.description;
        page.price = entity.price;
        page.visible = entity.visible;
        page.active = entity.active;
      }

      return page;
    })
  }
}
