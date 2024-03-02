import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { type Request, type Response, Router } from 'express';
import { UserController } from './user.controller';
import { SchemaValidator } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/schema-validator.middleware';
import { CreateUserSchema, FindUserByAccessCodeSchema, FindUserByUuidSchema, UpdateUserAccessCodeSchema, UpdateUserByUuidSchema } from './structs/user.schema';
import { isTrustedRequest } from '@meisi-thesis/application-backend-utilities-shared/src/middlewares/allow-request.middleware';

export class UserGateway extends Gateway<Router> {
  private readonly controller: UserController = new UserController();

  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    this.router.get('/access-code/:accessCode', isTrustedRequest, SchemaValidator(FindUserByAccessCodeSchema), async (request: Request, response: Response) => await this.controller.findUserByAccessCode(request, response))
    this.router.put('/access-code', isTrustedRequest, SchemaValidator(UpdateUserAccessCodeSchema), async (request: Request, response: Response) => await this.controller.updateUserAccessCode(request, response))
    this.router.get('/:uuid', isTrustedRequest, SchemaValidator(FindUserByUuidSchema), async (request: Request, response: Response) => await this.controller.findUserByUuid(request, response))
    this.router.put('/:uuid', isTrustedRequest, SchemaValidator(UpdateUserByUuidSchema), async (request: Request, response: Response) => await this.controller.updateUserByUuid(request, response))
    this.router.post('/', isTrustedRequest, SchemaValidator(CreateUserSchema), async (request: Request, response: Response) => await this.controller.createUser(request, response))

    return this.router;
  }
}
