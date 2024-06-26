import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { pageMapper, type PageDTO, type PageEntity } from './structs/page.domain';
import { type UpdatePageByUuidRequest, type CreatePageRequest, type FindPageByUuidRequest, type FindPagesByQueryRequest } from './structs/page.request';
import { type PageRepository } from './page.repository';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { PageStateRepository } from './repositories/page-state.repository';

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

  public async findPagesByQuery (
    requestArgs: FindPagesByQueryRequest
  ): Promise<PageDTO[]> {
    const foundEntities = await this.repository
      .findPagesByQuery(requestArgs)
      .catch(() => { throw new InternalServerException(); })

    return foundEntities.filter((foundEntity) => pageMapper(foundEntity))
  }

  public async createPage (
    requestArgs: CreatePageRequest,
    requestOptions?: Record<string, string>
  ): Promise<PageDTO> {
    await this.networkProvider.doHttpRequest(
      '8000',
      `commerce/chapters/${requestArgs.chapterUuid}`,
      'GET',
      { authorization: requestOptions?.authorization ?? '' }
    )

    const createdEntity: PageEntity = {
      uuid: this.randomProvider.randomUUID(),
      chapterUuid: requestArgs.chapterUuid,
      designation: requestArgs.designation,
      description: requestArgs.description,
      price: requestArgs.price,
      visible: true,
      active: true,
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
      designation: requestArgs.designation ?? foundEntity.designation,
      description: requestArgs.description ?? foundEntity.description,
      price: requestArgs.price ?? foundEntity.price,
      visible: requestArgs.visible ?? foundEntity.visible,
      active: requestArgs.active ?? foundEntity.active,
      createdAt: foundEntity.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    await this.repository.updatePageByUuid(updatedEntity).catch(() => {
      throw new InternalServerException();
    })

    return pageMapper(updatedEntity);
  }
}
