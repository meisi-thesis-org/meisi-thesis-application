import { type Request, type Response } from 'express';
import { type FindSubscriptionsByForeignsUuidRequest, type FindSubscriptionByUuidRequest, type CreateSubscriptionRequest, type UpdateSubscriptionByUuidRequest } from './structs/subscription.request';
import { SubscriptionService } from './subscription.service';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';

export class SubscriptionController {
  private readonly service = new SubscriptionService();
  private readonly queueProvider = new QueueProvider();
  private readonly randomProvider = new RandomProvider();

  private async sendExceptionQueue(path: string, error: any): Promise<void> {
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

  public async findSubscriptionByUuid(request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindSubscriptionByUuidRequest = {
        uuid: request.params.userUuid
      }
      const responseArgs = await this.service.findSubscriptionByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::subscription::findSubscriptionByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findSubscriptionsByForeignsUuid(request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindSubscriptionsByForeignsUuidRequest = {
        walletUuid: String(request.query.walletUuid) ?? undefined,
        dossierUuid: String(request.query.dossierUuid) ?? undefined,
        bookUuid: String(request.query.bookUuid) ?? undefined,
        chapterUuid: String(request.query.chapterUuid) ?? undefined,
        pageUuid: String(request.query.pageUuid) ?? undefined
      }
      const responseArgs = await this.service.findSubscriptionsByForeignsUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting::subscription::findSubscriptionsByForeignsUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createSubscription(request: Request, response: Response): Promise<Response> {
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

  public async updateSubscriptionByUuid(request: Request, response: Response): Promise<Response> {
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
