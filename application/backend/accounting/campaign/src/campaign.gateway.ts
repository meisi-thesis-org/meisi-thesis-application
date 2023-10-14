import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { CreateCampaignSchema, FindCampaignByUuidSchema, UpdateCampaignByUuidSchema } from './domain/campaign.schema';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CampaignController } from './campaign.controller';

export class CampaignGateway extends Gateway<Router> {
  private readonly controller: CampaignController = new CampaignController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindCampaignByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateCampaignByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateCampaignSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))

    return this.router;
  }
}
