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
    const foundChapters = await this.repository
      .findChaptersByBookUuid(findChaptersByBookUuidRequest.bookUuid)
      .catch(() => {
        throw new InternalServerException();
      })

    const mappedChapters = new Array<ChapterDTO>();

    for (const foundChapter of foundChapters) {
      mappedChapters.push(chapterMapper(foundChapter));
    }

    return mappedChapters;
  }

  public async findChapterByUuid (
    findChapterByUuidRequest: FindChapterByUuidRequest
  ): Promise<ChapterDTO> {
    const foundChapter = await this.repository
      .findChapterByUuid(findChapterByUuidRequest.uuid)
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundChapter === undefined) throw new NonFoundException()

    return chapterMapper(foundChapter);
  }

  public async createChapter (
    createChapterRequest: CreateChapterRequest
  ): Promise<ChapterDTO> {
    const foundChapter = await this.repository
      .findChapterByProps(
        createChapterRequest.bookUuid,
        createChapterRequest.designation
      )
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundChapter !== undefined) throw new ConflictException()

    await this.networkProvider.doHttpRequest(
      '8000',
      'commerce/books',
      'GET',
      undefined,
      { uuid: createChapterRequest.bookUuid }
    )

    const toCreateChapter: ChapterEntity = {
      uuid: this.randomProvider.randomUUID(),
      bookUuid: createChapterRequest.bookUuid,
      designation: createChapterRequest.designation,
      description: createChapterRequest.description,
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
    updateChapterByUuidRequest: UpdateChapterByUuidRequest
  ): Promise<ChapterDTO> {
    const foundChapter = await this.repository
      .findChapterByUuid(updateChapterByUuidRequest.uuid)
      .catch(() => {
        throw new InternalServerException();
      })

    if (foundChapter === undefined) throw new NonFoundException()

    const toUpdateChapter: Omit<ChapterEntity, 'uuid' | 'bookUuid' | 'createdAt'> = {
      designation: updateChapterByUuidRequest.designation ?? foundChapter.designation,
      description: updateChapterByUuidRequest.description ?? foundChapter.description,
      visible: updateChapterByUuidRequest.visible ?? foundChapter.visible,
      active: updateChapterByUuidRequest.active ?? foundChapter.active,
      updatedAt: new Date().toISOString()
    }

    const updatedChapter = await this.repository
      .updateChapterByUuid(updateChapterByUuidRequest.uuid, toUpdateChapter)
      .catch(() => {
        throw new InternalServerException();
      })

    if (updatedChapter === undefined) throw new NonFoundException()

    return chapterMapper(updatedChapter);
  }
}
