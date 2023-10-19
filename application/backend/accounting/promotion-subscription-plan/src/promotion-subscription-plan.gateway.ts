import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { CreatePromotionSubscriptionPlanSchema, FindPromotionSubscriptionPlansByForeignsUuidSchema, FindPromotionSubscriptionPlanByUuidSchema, UpdatePromotionSubscriptionPlanByUuidSchema } from './structs/promotion-subscription-plan.schema';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { PromotionSubscriptionPlanController } from './promotion-subscription-plan.controller';

export class PromotionSubscriptionPlanGateway extends Gateway<Router> {
  private readonly controller: PromotionSubscriptionPlanController = new PromotionSubscriptionPlanController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindPromotionSubscriptionPlanByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdatePromotionSubscriptionPlanByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.get('/', SchemaValidator(FindPromotionSubscriptionPlansByForeignsUuidSchema), async (request: Request, response: Response) => await this.controller.findBulkByForeignsUuid(request, response))
    this.router.post('/', SchemaValidator(CreatePromotionSubscriptionPlanSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))

    return this.router;
  }
}
