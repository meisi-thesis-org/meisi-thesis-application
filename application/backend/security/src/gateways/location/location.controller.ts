import { type Request, type Response } from 'express';
import { FindLocationByUuidRequest } from './requests/find-location-by-uuid.request';
import { LocationService } from './location.service';
import { CreateLocationRequest } from './requests/create-location.request';
import { UpdateCoordinatesByUuidRequest } from './requests/update-coordinates-by-uuid.request';
import { UpdateActivityByUuidRequest } from './requests/update-activity-by-uuid.request';
import { UpdateStatusByUuidRequest } from './requests/update-status-by-uuid.request';
import { FindLocationsRequest } from './requests/find-locations.request';

export class LocationController {
  private readonly service: LocationService;

  public constructor () {
    this.service = new LocationService();
  }

  public async findLocations (request: Request, response: Response): Promise<Response> {
    try {
      const findLocationsRequest = new FindLocationsRequest(
        request.query.userUuid !== undefined ? String(request.query.userUuid) : undefined,
        request.query.coordinateX !== undefined ? String(request.query.coordinateX) : undefined,
        request.query.coordinateY !== undefined ? String(request.query.coordinateY) : undefined
      );
      const locations = await this.service.findLocations(findLocationsRequest);
      return response.status(200).json(locations);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async findLocationByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const findLocationByUuidRequest = new FindLocationByUuidRequest(request.params.uuid);
      const location = await this.service.findLocationByUuid(findLocationByUuidRequest);
      return response.status(200).json(location);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async createLocation (request: Request, response: Response): Promise<Response> {
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

  public async updateCoordinatesByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateCoordinatesByUuidRequest = new UpdateCoordinatesByUuidRequest(
        request.params.uuid,
        request.body.coordinateX,
        request.body.coordinateY
      );
      const location = await this.service.updateCoordinatesByUuid(updateCoordinatesByUuidRequest);
      return response.status(201).json(location);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async updateStatusByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateStateByUuidRequest = new UpdateStatusByUuidRequest(
        request.params.uuid,
        request.body.enabled
      );
      const location = await this.service.updateStatusByUuid(updateStateByUuidRequest);
      return response.status(201).json(location);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }

  public async updateActivityByUuid (request: Request, response: Response): Promise<Response> {
    try {
      const updateActivityByUuidRequest = new UpdateActivityByUuidRequest(
        request.params.uuid,
        request.body.activated
      );
      const location = await this.service.updateActivityByUuid(updateActivityByUuidRequest);
      return response.status(201).json(location);
    } catch (error: any) {
      return response.status(error.getHttpCode()).json();
    }
  }
}
