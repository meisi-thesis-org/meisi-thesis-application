import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { Router, type Request, type Response } from 'express';
import { BookController } from './book.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateBookSchema, FindBookByUuidSchema, FindBooksByQuerySchema, UpdateBookByUuidSchema } from './structs/book.schema';

export class BookGateway extends Gateway<Router> {
  private readonly controller: BookController = new BookController();
  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindBookByUuidSchema), async (request: Request, response: Response) => await this.controller.findBookByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateBookByUuidSchema), async (request: Request, response: Response) => await this.controller.updateBookByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateBookSchema), async (request: Request, response: Response) => await this.controller.createBook(request, response))
    this.router.get('/', SchemaValidator(FindBooksByQuerySchema), async (request: Request, response: Response) => await this.controller.findBooksByQuery(request, response))

    return this.router;
  }
}
