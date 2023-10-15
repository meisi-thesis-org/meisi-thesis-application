import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { CreateSubscriptionSchema, FindSubscriptionByUuidSchema, UpdateSubscriptionByUuidSchema } from './domain/subscription.schema';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { SubscriptionController } from './subscription.controller';

export class SubscriptionGateway extends Gateway<Router> {
  private readonly controller: SubscriptionController = new SubscriptionController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindSubscriptionByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateSubscriptionByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateSubscriptionSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))

    return this.router;
  }
}
