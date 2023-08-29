import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { LocationController } from './location.controller';

export class LocationGateway extends Gateway<Router> {
  private readonly locationController: LocationController;

  public constructor () {
    super(Router());

    this.locationController = new LocationController();
  }

  public override subscribe (): Router {
    this.router.get('/', async (request: Request, response: Response) => await this.locationController.findLocations(request, response))
    this.router.get('/:uuid', async (request: Request, response: Response) => await this.locationController.findLocationByUuid(request, response))
    this.router.post('/', async (request: Request, response: Response) => await this.locationController.createLocation(request, response))
    this.router.put('/:uuid/coordinates', async (request: Request, response: Response) => await this.locationController.updateCoordinatesByUuid(request, response))
    this.router.put('/:uuid/status', async (request: Request, response: Response) => await this.locationController.updateStatusByUuid(request, response))
    this.router.put('/:uuid/activity', async (request: Request, response: Response) => await this.locationController.updateActivityByUuid(request, response))

    return this.router;
  }
}
