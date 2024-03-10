import { type Request, type Response } from 'express';
import { DossierService } from './dossier.service';
import {
  type UpdateDossierByUuidRequest,
  type CreateDossierRequest,
  type FindDossierByQueryRequest,
  type FindDossierByUuidRequest
} from './structs/dossier.request';
import { RandomProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/random.provider';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';
import { InternalServerException } from '@meisi-thesis/application-backend-utilities-shared/src/exceptions/internal-server.exception';

export class DossierController {
  private readonly service: DossierService = new DossierService();
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

  public async findDossierByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findDossierByUuidRequest: FindDossierByUuidRequest = {
        uuid: request.params.uuid
      }
      const dossier = await this.service.findDossierByUuid(findDossierByUuidRequest);
      return response.status(200).json(dossier);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.dossiers::findDossierByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  async updateDossierByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateDossierByUuidRequest: UpdateDossierByUuidRequest = {
        uuid: request.params.uuid,
        designation: request.body.designation,
        price: request.body.price,
        visible: request.body.visible,
        active: request.body.active
      }
      const dossier = await this.service.updateDossierByUuid(updateDossierByUuidRequest);
      return response.status(201).json(dossier);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.dossiers::updateDossierByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  async createDossier (request: Request, response: Response): Promise<Response> {
    try {
      const createDossierRequest: CreateDossierRequest = {
        userUuid: request.body.userUuid,
        designation: request.body.designation,
        price: request.body.price
      }
      const dossier = await this.service.createDossier(createDossierRequest, { authorization: request.headers.authorization ?? '' });
      return response.status(201).json(dossier);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.dossiers::createDossier', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  async findDossiersByQuery (request: Request, response: Response): Promise<Response> {
    try {
      const FindDossierByQueryRequest: FindDossierByQueryRequest = {
        userUuid: request.query.userUuid !== undefined ? String(request.query.userUuid) : undefined
      }
      const dossiers = await this.service.findDossiersByQuery(FindDossierByQueryRequest);
      return response.status(200).json(dossiers);
    } catch (error: any) {
      await this.sendExceptionQueue('commerce.dossiers::findDossiersByQuery', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
