import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { ProposalController } from './proposal.controller';
import { CreateProposalSchema, FindProposalByUuidSchema, UpdateProposalByUuidSchema } from './structs/proposal.schema';
import { type Request, type Response, Router } from 'express';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';

export class ProposalGateway extends Gateway<Router> {
  private readonly controller: ProposalController = new ProposalController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindProposalByUuidSchema), async (request: Request, response: Response) => await this.controller.findOneByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateProposalByUuidSchema), async (request: Request, response: Response) => await this.controller.updateOneByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateProposalSchema), async (request: Request, response: Response) => await this.controller.createOne(request, response))
    this.router.get('/', async (request: Request, response: Response) => await this.controller.findBulk(request, response))

    return this.router;
  }
}
