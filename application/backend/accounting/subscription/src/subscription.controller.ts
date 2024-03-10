import { type Request, type Response } from 'express';
import { type FindSubscriptionsByForeignsUuidRequest, type FindSubscriptionByUuidRequest, type CreateSubscriptionRequest, type UpdateSubscriptionByUuidRequest } from './structs/subscription.request';
import { SubscriptionService } from './subscription.service';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';

export class SubscriptionController {
  private readonly service = new SubscriptionService();
  private readonly queueProvider = new QueueProvider();
  private readonly randomProvider = new RandomProvider();

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

  public async findSubscriptionByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindSubscriptionByUuidRequest = {
        uuid: request.params.uuid
      }
      const responseArgs = await this.service.findSubscriptionByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::subscription::findSubscriptionByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findSubscriptionsByForeignsUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindSubscriptionsByForeignsUuidRequest = {
        walletUuid: request.query.walletUuid?.toString() ?? undefined,
        dossierUuid: request.query.dossierUuid?.toString() ?? undefined,
        bookUuid: request.query.bookUuid?.toString() ?? undefined,
        chapterUuid: request.query.chapterUuid?.toString() ?? undefined,
        pageUuid: request.query.pageUuid?.toString() ?? undefined
      }
      const responseArgs = await this.service.findSubscriptionsByForeignsUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::subscription::findSubscriptionsByForeignsUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createSubscription (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: CreateSubscriptionRequest = {
        walletUuid: request.body.walletUuid,
        dossierUuid: request.body.dossierUuid,
        bookUuid: request.body.bookUuid,
        chapterUuid: request.body.chapterUuid,
        pageUuid: request.body.pageUuid
      }
      const responseArgs = await this.service.createSubscription(requestArgs, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::subscription::createSubscription', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateSubscriptionByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: UpdateSubscriptionByUuidRequest = {
        uuid: request.params.uuid,
        active: request.body.active,
        visible: request.body.visible
      }
      const responseArgs = await this.service.updateSubscriptionByUuid(requestArgs);
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::subscription::updateSubscriptionByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
