import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type Request, type Response } from 'express';
import { SubscriptionService } from './subscription.service'

export class SubscriptionController {
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly service: SubscriptionService = new SubscriptionService();

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

  public async findOneByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const responseArgs = await this.service.findOneByUuid({
        uuid: request.params.uuid
      });
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:subscription::findOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createOne (request: Request, response: Response): Promise<Response> {
    try {
      const responseArgs = await this.service.createOne({
        userUuid: request.body.userUuid,
        subscriptionPlanUuid: request.body.subscriptionPlanUuid
      });
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:subscription::createOne', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateOneByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const responseArgs = await this.service.updateOneByUuid({
        uuid: request.params.uuid,
        userUuid: request.body.userUuid,
        subscriptionPlanUuid: request.body.subscriptionPlanUuid,
        active: request.body.active
      });
      return response.status(201).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:subscription::updateOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
