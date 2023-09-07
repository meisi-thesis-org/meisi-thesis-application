import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { Router, type Request, type Response } from 'express';
import { BookController } from './book.controller';

export class BookGateway extends Gateway<Router> {
  private readonly controller: BookController = new BookController();
  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', async (request: Request, response: Response) => await this.controller.findBookByUuid(request, response))
    this.router.put('/:uuid', async (request: Request, response: Response) => await this.controller.updateBookByUuid(request, response))
    this.router.post('/', async (request: Request, response: Response) => await this.controller.createBook(request, response))
    this.router.get('/', async (request: Request, response: Response) => await this.controller.findBooksByDossierUuid(request, response))

    return this.router;
  }
}
