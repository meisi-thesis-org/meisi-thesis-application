import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { ProposalCommerceController } from './proposal-commerce.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateProposalCommerceSchema, FindProposalCommerceByUuidSchema, FindProposalCommercesByForeignsUuidSchema, UpdateProposalCommerceByUuidSchema } from './structs/proposal-commerce.schema';

export class ProposalCommerceGateway extends Gateway<Router> {
  private readonly controller: ProposalCommerceController = new ProposalCommerceController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindProposalCommerceByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateProposalCommerceByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateProposalCommerceSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))
    this.router.get('/', SchemaValidator(FindProposalCommercesByForeignsUuidSchema), async (request: Request, response: Response) => await this.controller.findBulkByForeignsUuid(request, response))

    return this.router;
  }
}
