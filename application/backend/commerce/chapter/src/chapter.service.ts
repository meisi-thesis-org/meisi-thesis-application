import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';
import { type ChapterRepository } from './chapter.repository';
import { type UpdateChapterByUuidRequest, type CreateChapterRequest, type FindChapterByUuidRequest, type FindChaptersByBookUuidRequest } from './structs/chapter.request';
import { type ChapterDTO, chapterMapper, type ChapterEntity } from './structs/chapter.domain';
import { NonFoundException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/non-found.exception';
import { ConflictException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/conflict.exception';
import { NetworkProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/network.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { ChapterStateRepository } from './repositories/chapter-state.repository';

export class ChapterService {
  private readonly repository: ChapterRepository = new ChapterStateRepository();
  private readonly networkProvider: NetworkProvider = new NetworkProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  public async findChaptersByBookUuid (
    findChaptersByBookUuidRequest: FindChaptersByBookUuidRequest
  ): Promise<ChapterDTO[]> {
    const foundEntitys = await this.repository
      .findChaptersByBookUuid(findChaptersByBookUuidRequest.bookUuid)
      .catch(() => {
        throw new InternalServerException();
      })

    const mappedChapters = new Array<ChapterDTO>();

    for (const foundEntity of foundEntitys) {
      mappedChapters.push(chapterMapper(foundEntity));
    }

    return mappedChapters;
  }

  public async findChapterByUuid (
    findChapterByUuidRequest: FindChapterByUuidRequest
  ): Promise<ChapterDTO> {
    const foundEntity = await this.repository
      .findChapterByUuid(findChapterByUuidRequest.uuid)
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundEntity === undefined) throw new NonFoundException()

    return chapterMapper(foundEntity);
  }

  public async createChapter (
    createChapterRequest: CreateChapterRequest,
    requestOptions?: Record<string, string>
  ): Promise<ChapterDTO> {
    const foundEntity = await this.repository
      .findChapterByProps(
        createChapterRequest.bookUuid,
        createChapterRequest.designation
      )
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundEntity !== undefined) throw new ConflictException()

    await this.networkProvider.doHttpRequest(
      '8000',
      `commerce/books/${createChapterRequest.bookUuid}`,
      'GET',
      { authorization: requestOptions?.authorization ?? '' }
    )

    const toCreateChapter: ChapterEntity = {
      uuid: this.randomProvider.randomUUID(),
      bookUuid: createChapterRequest.bookUuid,
      designation: createChapterRequest.designation,
      description: createChapterRequest.description,
      price: createChapterRequest.price,
      visible: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await this.repository.createChapter(toCreateChapter).catch(() => {
      throw new InternalServerException();
    })

    return chapterMapper(toCreateChapter);
  }

  public async updateChapterByUuid (
    requestArgs: UpdateChapterByUuidRequest
  ): Promise<ChapterDTO> {
    const foundEntity = await this.repository
      .findChapterByUuid(requestArgs.uuid)
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundEntity === undefined) throw new NonFoundException()

    const toUpdateChapter: ChapterEntity = {
      uuid: foundEntity.uuid,
      bookUuid: foundEntity.bookUuid,
      designation: requestArgs.designation ?? foundEntity.designation,
      description: requestArgs.description ?? foundEntity.description,
      price: requestArgs.price ?? foundEntity.price,
      visible: requestArgs.visible ?? foundEntity.visible,
      active: requestArgs.active ?? foundEntity.active,
      createdAt: foundEntity.createdAt,
      updatedAt: this.randomProvider.randomDateToIsoString()
    };

    const updatedChapter = await this.repository
      .updateChapterByUuid(requestArgs.uuid, toUpdateChapter)
      .catch(() => {
        throw new InternalServerException();
      })

    if (updatedChapter === undefined) throw new NonFoundException()

    return chapterMapper(toUpdateChapter);
  }
}
