import { type Request, type Response, Router } from 'express';
import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { DossierController } from './dossier.controller';

export class DossierGateway extends Gateway<Router> {
  private readonly controller: DossierController = new DossierController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/', async (request: Request, response: Response) => await this.controller.findDossierByUserUuid(request, response))
    this.router.post('/', async (request: Request, response: Response) => await this.controller.createDossier(request, response))
    this.router.put('/:uuid', async (request: Request, response: Response) => await this.controller.updateDossierByUuid(request, response))
    this.router.get('/:uuid', async (request: Request, response: Response) => await this.controller.findDossierByUuid(request, response))
    return this.router;
  }
}
