import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { type Request, type Response, Router } from 'express';
import { CreateNetworkSchema, FindNetworkByUuidSchema, FindNetworksByUserUuidSchema, UpdateNetworkByUuidSchema } from './structs/network.schema';
import { NetworkController } from './network.controller';

export class NetworkGateway extends Gateway<Router> {
  private readonly controller: NetworkController = new NetworkController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindNetworkByUuidSchema), async (request: Request, response: Response) => await this.controller.findNetworkByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateNetworkByUuidSchema), async (request: Request, response: Response) => await this.controller.updateNetworkByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateNetworkSchema), async (request: Request, response: Response) => await this.controller.createNetwork(request, response))
    this.router.get('/', SchemaValidator(FindNetworksByUserUuidSchema), async (request: Request, response: Response) => await this.controller.findNetworksByUserUuid(request, response))

    return this.router;
  }
}
