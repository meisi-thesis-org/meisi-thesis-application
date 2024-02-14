import { type Request, type Response } from 'express';
import { type FindPageByUuidRequest, type CreatePageRequest, type UpdatePageByUuidRequest, type FindPageByChapterUuidRequest } from './structs/page.request';
import { PageService } from './page.service';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';

export class PageController {
  private readonly service = new PageService();
  private readonly queueProvider = new QueueProvider();
  private readonly randomProvider = new RandomProvider();

  private async sendExceptionQueue (path: string, error: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({
        routeURL: path,
        correlationUuid: this.randomProvider.randomUUID(),
        exception: error
      }))
    )
  }

  public async findPageByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindPageByUuidRequest = {
        uuid: request.params.pageUuid
      }
      const responseArgs = await this.service.findPageByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::page::findPageByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findPagesByChapterUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindPageByChapterUuidRequest = {
        chapterUuid: String(request.query.chapterUuid) ?? undefined
      }
      const responseArgs = await this.service.findPagesByChapterUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::page::findPagesByChapterUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createPage (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: CreatePageRequest = {
        chapterUuid: request.body.chapterUuid,
        designation: request.body.designation,
        description: request.body.description
      }
      const responseArgs = await this.service.createPage(requestArgs, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::page::createPage', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updatePageByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: UpdatePageByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        description: request.body.description,
        visible: request.body.visible,
        active: request.body.active
      }
      const responseArgs = await this.service.updatePageByUuid(requestArgs);
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::page::updatePageByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
