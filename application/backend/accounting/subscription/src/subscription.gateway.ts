import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { SubscriptionController } from './subscription.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateSubscriptionSchema, FindSubscriptionByForeignsUuidSchema, FindSubscriptionByUuidSchema, UpdateSubscriptionByUuidSchema } from './structs/subscription.schema';

export class SubscriptionGateway extends Gateway<Router> {
  private readonly controller: SubscriptionController = new SubscriptionController();

  public constructor () {
    super(Router())
  }

  public subscribe (): Router {
    this.router.post('/', SchemaValidator(CreateSubscriptionSchema), async (request: Request, response: Response) => await this.controller.createSubscription(request, response))
    this.router.get('/', SchemaValidator(FindSubscriptionByForeignsUuidSchema), async (request: Request, response: Response) => await this.controller.findSubscriptionsByForeignsUuid(request, response))
    this.router.get('/:uuid', SchemaValidator(FindSubscriptionByUuidSchema), async (request: Request, response: Response) => await this.controller.findSubscriptionByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateSubscriptionByUuidSchema), async (request: Request, response: Response) => await this.controller.updateSubscriptionByUuid(request, response))

    return this.router;
  }
}
