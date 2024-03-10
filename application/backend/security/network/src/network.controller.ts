import { type Request, type Response } from 'express';
import { type UpdateNetworkByUuidRequest, type CreateNetworkRequest, type FindNetworkByUuidRequest, type FindNetworksByUserUuidRequest } from './structs/network.request';
import { NetworkService } from './network.service';

export class NetworkController {
  private readonly service: NetworkService = new NetworkService();

  private async sendExceptionQueue (routeURL: string, exception: any): Promise<void> {
    const isExceptionQueueActive = process.env.EXCEPTION_QUEUE_ACTIVE

    if (isExceptionQueueActive === undefined || isExceptionQueueActive === 'false') {
      return;
    }

    const correlationUuid = this.randomProvider.randomUUID()

    await this.queueProvider.sendQueue(
      process.env.RABBITMQ_URL ?? 'amqp://localhost',
      'create_exception',
      Buffer.from(JSON.stringify({ routeURL, correlationUuid, exception }))
    ).catch(() => { throw new InternalServerException() });
  }

  public async findNetworksByUserUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findNetworksByUserUuidRequest: FindNetworksByUserUuidRequest = {
        userUuid: String(request.query.userUuid)
      }
      const networks = await this.service.findNetworksByUserUuid(findNetworksByUserUuidRequest);
      return response.status(200).json(networks)
    } catch (error: any) {
      await this.sendExceptionQueue('security.networks::findNetworksByUserUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findNetworkByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findNetworkByUuidRequest: FindNetworkByUuidRequest = {
        uuid: request.params.uuid
      }
      const network = await this.service.findNetworkByUuid(findNetworkByUuidRequest);
      return response.status(200).json(network)
    } catch (error: any) {
      await this.sendExceptionQueue('security.networks::findNetworkByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createNetwork (request: Request, response: Response): Promise<Response> {
    try {
      const createNetworkRequest: CreateNetworkRequest = {
        userUuid: request.body.userUuid,
        latitude: request.body.latitude,
        longitude: request.body.longitude
      }
      const network = await this.service.createNetwork(createNetworkRequest);
      return response.status(201).json(network)
    } catch (error: any) {
      await this.sendExceptionQueue('security.networks::createNetwork', error);
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateNetworkByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateNetworkByUuidRequest: UpdateNetworkByUuidRequest = {
        uuid: request.params.uuid,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        visible: request.body.visible,
        active: request.body.active
      }
      const network = await this.service.updateNetworkByUuid(updateNetworkByUuidRequest);
      return response.status(201).json(network)
    } catch (error: any) {
      await this.sendExceptionQueue('security.networks::updateNetworkByUuid', error);
      return response.status(error.getHttpCode()).json()
    }
  }
}
