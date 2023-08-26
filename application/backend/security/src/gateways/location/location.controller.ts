import { response, type Request, type Response } from 'express';
import { FindLocationByUuidRequest } from './requests/find-location-by-uuid.request';
import { LocationService } from './location.service';
import { CreateLocationRequest } from './requests/create-location.request';

export class LocationController {
  private readonly service: LocationService;

  public constructor () {
    this.service = new LocationService();
  }

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
      const createLocationRequest = new CreateLocationRequest(
        request.body.userUuid,
        request.body.coordinateX,
        request.body.coordinateY
      );
      const location = await this.service.createLocation(createLocationRequest);
      return response.status(201).json(location);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }
}
