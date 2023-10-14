import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { SubscriptionPlanController } from './subscription-plan.controller';
import {
  CreateSubscriptionPlanSchema,
  FindSubscriptionPlanByUuidSchema,
  UpdateSubscriptionPlanByUuidSchema
} from './domain/subscription-plan.schema';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';

export class SubscriptionPlanGateway extends Gateway<Router> {
  private readonly controller: SubscriptionPlanController = new SubscriptionPlanController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindSubscriptionPlanByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateSubscriptionPlanByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateSubscriptionPlanSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))
    this.router.get('/', async (request: Request, response: Response) => await this.controller.findBulk(request, response))

    return this.router;
  }
}
