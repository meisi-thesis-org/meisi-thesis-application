import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { PromotionProposalController } from './promotion-proposal.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreatePromotionProposalSchema, FindPromotionProposalByUuidSchema, FindPromotionProposalsByForeignsUuidSchema, UpdatePromotionProposalByUuidSchema } from './structs/promotion-proposal.schema';

export class PromotionProposalGateway extends Gateway<Router> {
  private readonly controller: PromotionProposalController = new PromotionProposalController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindPromotionProposalByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdatePromotionProposalByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreatePromotionProposalSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))
    this.router.get('/', SchemaValidator(FindPromotionProposalsByForeignsUuidSchema), async (request: Request, response: Response) => await this.controller.findBulkByForeignsUuid(request, response))

    return this.router;
  }
}
