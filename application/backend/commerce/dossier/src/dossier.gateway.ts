import { type Request, type Response, Router } from 'express';
import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { DossierController } from './dossier.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateDossierSchema, FindDossierByQuerySchema, FindDossierByUuidSchema, UpdateDossierByUuidSchema } from './structs/dossier.schema';

export class DossierGateway extends Gateway<Router> {
  private readonly controller: DossierController = new DossierController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/', SchemaValidator(FindDossierByQuerySchema), async (request: Request, response: Response) => await this.controller.findDossierByQuery(request, response))
    this.router.post('/', SchemaValidator(CreateDossierSchema), async (request: Request, response: Response) => await this.controller.createDossier(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateDossierByUuidSchema), async (request: Request, response: Response) => await this.controller.updateDossierByUuid(request, response))
    this.router.get('/:uuid', SchemaValidator(FindDossierByUuidSchema), async (request: Request, response: Response) => await this.controller.findDossierByUuid(request, response))
    return this.router;
  }
}
