import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type Request, type Response } from 'express';
import { PromotionProposalService } from './promotion-proposal.service';
import { type CreatePromotionProposalRequest, type UpdatePromotionProposalByUuidRequest, type FindPromotionProposalByUuidRequest, type FindPromotionProposalsByForeignsUuidRequest } from './structs/promotion-proposal.request';

export class PromotionProposalController {
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly service: PromotionProposalService = new PromotionProposalService();

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
      const requestArgs: FindPromotionProposalByUuidRequest = { uuid: request.params.uuid };
      const responseArgs = await this.service.findOneByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:promotion-proposal::findOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findBulkByForeignsUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindPromotionProposalsByForeignsUuidRequest = {
        proposalUuid: String(request.query.proposalUuid),
        promotionUuid: String(request.query.promotionUuid)
      };
      const responseArgs = await this.service.findBulkByForeignsUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:promotion-proposal::findBulkByForeignsUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createOne (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: CreatePromotionProposalRequest = {
        proposalUuid: request.body.proposalUuid,
        promotionUuid: request.body.promotionUuid
      }
      const responseArgs = await this.service.createOne(requestArgs);
      return response.status(201).json(responseArgs);
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:promotion-proposal::createOne', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateOneByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: UpdatePromotionProposalByUuidRequest = {
        uuid: request.params.uuid,
        active: request.body.active
      }
      const responseArgs = await this.service.updateOneByUuid(requestArgs);
      return response.status(201).json(responseArgs);
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:promotion-proposal::updateOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
