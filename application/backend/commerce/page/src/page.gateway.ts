import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { PageController } from './page.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreatePageSchema, FindPagesByQuerySchema, FindPageByUuidSchema, UpdatePageByUuidSchema } from './structs/page.schema';

export class PageGateway extends Gateway<Router> {
  private readonly controller: PageController = new PageController();

  public constructor () {
    super(Router())
  }

  public subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindPageByUuidSchema), async (request: Request, response: Response) => await this.controller.findPageByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdatePageByUuidSchema), async (request: Request, response: Response) => await this.controller.updatePageByUuid(request, response))
    this.router.post('/', SchemaValidator(CreatePageSchema), async (request: Request, response: Response) => await this.controller.createPage(request, response))
    this.router.get('/', SchemaValidator(FindPagesByQuerySchema), async (request: Request, response: Response) => await this.controller.findPagesByQuery(request, response))

    return this.router;
  }
}
