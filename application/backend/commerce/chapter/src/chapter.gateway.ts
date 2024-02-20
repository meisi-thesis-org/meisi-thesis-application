import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { Router, type Request, type Response } from 'express';
import { ChapterController } from './chapter.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateChapterSchema, FindChapterByUuidSchema, FindChaptersByQuerySchema, UpdateChapterByUuidSchema } from './structs/chapter.schema';

export class ChapterGateway extends Gateway<Router> {
  private readonly controller: ChapterController = new ChapterController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/:uuid', SchemaValidator(FindChapterByUuidSchema), async (request: Request, response: Response) => await this.controller.findChapterByUuid(request, response))
    this.router.put('/:uuid', SchemaValidator(UpdateChapterByUuidSchema), async (request: Request, response: Response) => await this.controller.updateChapterByUuid(request, response))
    this.router.post('/', SchemaValidator(CreateChapterSchema), async (request: Request, response: Response) => await this.controller.createChapter(request, response))
    this.router.get('/', SchemaValidator(FindChaptersByQuerySchema), async (request: Request, response: Response) => await this.controller.findChaptersByQuery(request, response))

    return this.router;
  }
}
