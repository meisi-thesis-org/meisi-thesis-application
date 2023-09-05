import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { type Request, type Response, Router } from 'express';
import { CreateLocationSchema, FindLocationByUuidSchema, FindLocationsByUserUuidSchema, UpdateLocationByUuidSchema } from './structs/location.schema';
import { LocationController } from './location.controller';

export class LocationGateway extends Gateway<Router> {
  private readonly controller: LocationController = new LocationController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindLocationByUuidSchema), async (request: Request, response: Response) => await this.controller.findLocationByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateLocationByUuidSchema), async (request: Request, response: Response) => await this.controller.updateLocationByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateLocationSchema), async (request: Request, response: Response) => await this.controller.createLocation(request, response))
    this.router.get('/', SchemaValidator(FindLocationsByUserUuidSchema), async (request: Request, response: Response) => await this.controller.findLocationsByUserUuid(request, response))

    return this.router;
  }
}
