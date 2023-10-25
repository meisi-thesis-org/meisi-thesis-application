import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { pageMapper, type PageDTO, type PageEntity } from './structs/page.domain';
import { type UpdatePageByUuidRequest, type CreatePageRequest, type FindPageByUuidRequest, type FindPageByChapterUuidRequest } from './structs/page.request';
import { type PageRepository } from './page.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { PageStateRepository } from './repositories/page-state.repository';
import { BadRequestException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/bad-request.exception';

export class PageService {
  private readonly repository: PageRepository = new PageStateRepository();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();

  public async findPageByUuid (requestArgs: FindPageByUuidRequest): Promise<PageDTO> {
    const foundEntity = await this.repository
      .findPageByUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    return pageMapper(foundEntity)
  }

  public async findPagesByChapterUuid (requestArgs: FindPageByChapterUuidRequest): Promise<PageDTO[]> {
    const foundEntities = await this.repository
      .findPagesByChapterUuid(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    if (foundEntities.length === 0) throw new NonFoundException();

    return foundEntities.filter((foundEntity) => pageMapper(foundEntity))
  }

  public async createPage (requestArgs: CreatePageRequest): Promise<PageDTO> {
    const user = await this.networkProvider
      .doHttpRequest('8000', 'commerce/chapters', 'GET', undefined, { uuid: requestArgs.chapterUuid })
      .catch((error) => { throw error }) as { active: boolean, enabled: boolean }

    if (!user.enabled || !user.active) {
      throw new BadRequestException();
    }

    const createdEntity: PageEntity = {
      uuid: this.randomProvider.randomUUID(),
      chapterUuid: requestArgs.chapterUuid,
      description: requestArgs.description,
      active: true,
      enabled: true,
      createdAt: this.randomProvider.randomDateToIsoString(),
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.createPage(createdEntity).catch(() => {
      throw new InternalServerException();
    })

    return pageMapper(createdEntity);
  }

  public async updatePageByUuid (requestArgs: UpdatePageByUuidRequest): Promise<PageDTO> {
    const foundEntity = await this.repository
      .findPageByUuid({ uuid: requestArgs.uuid })
      .catch(() => { throw new InternalServerException(); })

    if (foundEntity === undefined) throw new NonFoundException();

    const updatedEntity: PageEntity = {
      uuid: foundEntity.uuid,
      chapterUuid: foundEntity.chapterUuid,
      description: requestArgs.description ?? foundEntity.description,
      active: requestArgs.active ?? foundEntity.active,
      enabled: requestArgs.enabled ?? foundEntity.enabled,
      createdAt: foundEntity.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.updatePageByUuid(updatedEntity).catch(() => {
      throw new InternalServerException();
    })

    return pageMapper(updatedEntity);
  }
}
