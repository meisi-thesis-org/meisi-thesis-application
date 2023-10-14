import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { CreatePromotionSchema, FindPromotionByUuidSchema, UpdatePromotionByUuidSchema } from './domain/promotion.schema';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { PromotionController } from './promotion.controller';

export class PromotionGateway extends Gateway<Router> {
  private readonly controller: PromotionController = new PromotionController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindPromotionByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdatePromotionByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreatePromotionSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))

    return this.router;
  }
}
