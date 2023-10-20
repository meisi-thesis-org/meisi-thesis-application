import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { CampaignPromotionController } from './campaign-promotion.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateCampaignPromotionSchema, FindCampaignPromotionByUuidSchema, FindCampaignPromotionsByForeignsUuidSchema, UpdateCampaignPromotionByUuidSchema } from './structs/campaign-promotion.schema';

export class CampaignPromotionGateway extends Gateway<Router> {
  private readonly controller: CampaignPromotionController = new CampaignPromotionController();
  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindCampaignPromotionByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateCampaignPromotionByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateCampaignPromotionSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))
    this.router.get('/', SchemaValidator(FindCampaignPromotionsByForeignsUuidSchema), async (request: Request, response: Response) => await this.controller.findBulkByForeignsUuid(request, response))

    return this.router;
  }
}
