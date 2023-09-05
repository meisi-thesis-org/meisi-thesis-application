import { type Request, type Response } from 'express';
import { type UpdateLocationByUuidRequest, type CreateLocationRequest, type FindLocationByUuidRequest, type FindLocationsByUserUuidRequest } from './structs/location.request';
import { LocationService } from './location.service';

export class LocationController {
  private readonly service: LocationService = new LocationService();

  public async findLocationsByUserUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findLocationsByUserUuidRequest: FindLocationsByUserUuidRequest = {
        userUuid: String(request.query.userUuid)
      }
      const locations = await this.service.findLocationsByUserUuid(findLocationsByUserUuidRequest);
      return response.status(200).json(locations)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async findLocationByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findLocationByUuidRequest: FindLocationByUuidRequest = {
        uuid: request.params.uuid
      }
      const location = await this.service.findLocationByUuid(findLocationByUuidRequest);
      return response.status(200).json(location)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async createLocation (request: Request, response: Response): Promise<Response> {
    try {
      const createLocationRequest: CreateLocationRequest = {
        userUuid: request.body.userUuid,
        coordinateX: request.body.coordinateX,
        coordinateY: request.body.coordinateY
      }
      const location = await this.service.createLocation(createLocationRequest);
      return response.status(201).json(location)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }

  public async updateLocationByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateLocationByUuidRequest: UpdateLocationByUuidRequest = {
        uuid: request.params.uuid,
        coordinateX: request.body.coordinateX,
        coordinateY: request.body.coordinateY,
        visible: request.body.visible,
        active: request.body.active
      }
      const location = await this.service.updateLocationByUuid(updateLocationByUuidRequest);
      return response.status(201).json(location)
    } catch (error: any) {
      return response.status(error.getHttpCode()).json()
    }
  }
}
