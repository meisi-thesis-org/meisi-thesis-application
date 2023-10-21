import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type Request, type Response } from 'express';
import { ProposalCommerceService } from './proposal-commerce.service';
import { type CreateProposalCommerceRequest, type UpdateProposalCommerceByUuidRequest, type FindProposalCommerceByUuidRequest, type FindProposalCommercesByForeignsUuidRequest } from './structs/proposal-commerce.request';

export class ProposalCommerceController {
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly service: ProposalCommerceService = new ProposalCommerceService();

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
      const requestArgs: FindProposalCommerceByUuidRequest = { uuid: request.params.uuid };
      const responseArgs = await this.service.findOneByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal-commerce::findOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findBulkByForeignsUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindProposalCommercesByForeignsUuidRequest = {
        proposalUuid: String(request.query.proposalUuid),
        chapterUuid: String(request.query.chapterUuid),
        bookUuid: String(request.query.bookUuid),
        dossierUuid: String(request.query.dossierUuid)
      };
      const responseArgs = await this.service.findBulkByForeignsUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal-commerce::findBulkByForeignsUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createOne (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: CreateProposalCommerceRequest = {
        proposalUuid: request.body.proposalUuid,
        chapterUuid: request.body.chapterUuid,
        bookUuid: request.body.bookUuid,
        dossierUuid: request.body.dossierUuid
      }
      const responseArgs = await this.service.createOne(requestArgs);
      return response.status(201).json(responseArgs);
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal-commerce::createOne', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateOneByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: UpdateProposalCommerceByUuidRequest = {
        uuid: request.params.uuid,
        active: request.body.active
      }
      const responseArgs = await this.service.updateOneByUuid(requestArgs);
      return response.status(201).json(responseArgs);
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal-commerce::updateOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
