import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { CreateSubscriptionPlanContentSchema, FindSubscriptionPlanContentByUuidSchema, UpdateSubscriptionPlanContentByUuidSchema } from './structs/subscription-plan-content.schema';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { PromotionSubscriptionPlanController } from './promotion-subscription-plan.controller';

export class SubscriptionPlanContentGatewayGateway extends Gateway<Router> {
  private readonly controller: PromotionSubscriptionPlanController = new PromotionSubscriptionPlanController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindSubscriptionPlanContentByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateSubscriptionPlanContentByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.get('/', SchemaValidator(FindSubscriptionPlanContentByUuidSchema), async (request: Request, response: Response) => await this.controller.findBulkByForeignsUuid(request, response))
    this.router.post('/', SchemaValidator(CreateSubscriptionPlanContentSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))

    return this.router;
  }
}
