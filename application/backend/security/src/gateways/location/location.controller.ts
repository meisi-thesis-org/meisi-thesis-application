import { response, type Request, type Response } from 'express';
import { FindLocationByUuidRequest } from './requests/find-location-by-uuid.request';

export class LocationController {
  public async findLocationByUuid (request: Request, reponse: Response): Promise<Response> {
    try {
      const findLocationByUuidRequest = new FindLocationByUuidRequest(request.params.uuid);
      const location = await this.service.findLocationByUuid(findLocationByUuidRequest);
      return response.status(201).json(location);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async createLocationByUuid (request: Request, reponse: Response): Promise<Response> {
    try {
      throw new Error();
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async updateLocationByUuid (request: Request, reponse: Response): Promise<Response> {
    try {
      throw new Error();
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }
}
