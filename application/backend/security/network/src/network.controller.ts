import { type Request, type Response } from 'express';
import { type UpdateNetworkByUuidRequest, type CreateNetworkRequest, type FindNetworkByUuidRequest, type FindNetworksByUserUuidRequest } from './structs/network.request';
import { NetworkService } from './network.service';

export class NetworkController {
  private readonly service: NetworkService = new NetworkService();

  public async findNetworksByUserUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findNetworksByUserUuidRequest: FindNetworksByUserUuidRequest = {
        userUuid: String(request.query.userUuid)
      }
      const networks = await this.service.findNetworksByUserUuid(findNetworksByUserUuidRequest);
      return response.status(200).json(networks)
    } catch (error: any) {
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
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createNetwork (request: Request, response: Response): Promise<Response> {
    try {
      const createNetworkRequest: CreateNetworkRequest = {
        userUuid: request.body.userUuid,
        coordinateX: request.body.coordinateX,
        coordinateY: request.body.coordinateY
      }
      const network = await this.service.createNetwork(createNetworkRequest);
      return response.status(201).json(network)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateNetworkByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateNetworkByUuidRequest: UpdateNetworkByUuidRequest = {
        uuid: request.params.uuid,
        coordinateX: request.body.coordinateX,
        coordinateY: request.body.coordinateY,
        visible: request.body.visible,
        active: request.body.active
      }
      const network = await this.service.updateNetworkByUuid(updateNetworkByUuidRequest);
      return response.status(201).json(network)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}
