import {
  type Response,
  type Request
} from 'express'
import { type UpdateChapterByUuidRequest, type CreateChapterRequest, type FindChapterByUuidRequest, type FindChaptersByQueryRequest } from './structs/chapter.request';
import { ChapterService } from './chapter.service';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';

export class ChapterController {
  private readonly service: ChapterService = new ChapterService();
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();

  private async sendExceptionQueue (routeURL: string, exception: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({
        routeURL,
        correlationUuid: this.randomProvider.randomUUID(),
        exception
      }))
    ).catch(() => { throw new InternalServerException() });
  }

  public async findChaptersByQuery (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findChaptersByDossierUuidRequest: FindChaptersByQueryRequest = {
        bookUuid: String(request.query.bookUuid) ?? ''
      }
      const bookCollection = await this.service.findChaptersByQuery(findChaptersByDossierUuidRequest);
      return response.status(200).json(bookCollection);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.chapters::findChaptersByQuery', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findChapterByUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const findChapterByUuidRequest: FindChapterByUuidRequest = {
        uuid: request.params.uuid
      }
      const book = await this.service.findChapterByUuid(findChapterByUuidRequest);
      return response.status(200).json(book);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.chapters::findChapterByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createChapter (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const createChapterRequest: CreateChapterRequest = {
        bookUuid: request.body.bookUuid,
        designation: request.body.designation,
        description: request.body.description,
        price: request.body.price
      }
      const book = await this.service.createChapter(createChapterRequest, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(book);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.chapters::createChapter', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateChapterByUuid (
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const updateChapterByUuidRequest: UpdateChapterByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        description: request.body.description,
        price: request.body.price,
        visible: request.body.visible,
        active: request.body.active
      }
      const book = await this.service.updateChapterByUuid(updateChapterByUuidRequest);
      return response.status(201).json(book);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.chapters::updateChapterByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
