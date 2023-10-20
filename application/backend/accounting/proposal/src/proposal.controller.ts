import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { type Request, type Response } from 'express';
import { type UpdateProposalByUuidRequest, type CreateProposalRequest, type FindProposalByUuidRequest } from './structs/proposal.request';
import { ProposalService } from './proposal.service';

export class ProposalController {
  private readonly queueProvider: QueueProvider = new QueueProvider();
  private readonly randomProvider: RandomProvider = new RandomProvider();
  private readonly service: ProposalService = new ProposalService();

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

  public async findBulk (_request: Request, response: Response): Promise<Response> {
    try {
      const responseArgs = await this.service.findBulk();
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal::findBulk', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findOneByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: FindProposalByUuidRequest = { uuid: request.params.uuid };
      const responseArgs = await this.service.findOneByUuid(requestArgs);
      return response.status(200).json(responseArgs)
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal::findOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createOne (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: CreateProposalRequest = {
        designation: request.body.designation,
        description: request.body.description,
        price: request.body.price
      }
      const responseArgs = await this.service.createOne(requestArgs);
      return response.status(201).json(responseArgs);
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal::createOne', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateOneByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const requestArgs: UpdateProposalByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        description: request.body.description,
        price: request.body.price,
        visible: request.body.visible,
        active: request.body.active
      }
      const responseArgs = await this.service.updateOneByUuid(requestArgs);
      return response.status(201).json(responseArgs);
    } catch (error: any) {
      await this.sendExceptionQueue('accounting:proposal::updateOneByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
