import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { UserController } from './user.controller';

export class UserGateway extends Gateway<Router> {
  private readonly userController = new UserController();

  public constructor () {
    super(Router());
  }

  public subscribe (): Router {
    this.router.get('/:uuid', async (request: Request, response: Response) => await this.userController.findUserByUuid(request, response));
    this.router.post('/sign-up', async (request: Request, response: Response) => await this.userController.signUp(request, response));
    this.router.put('/sign-in', async (request: Request, response: Response) => await this.userController.signIn(request, response));
    this.router.put('/sign-out', async (request: Request, response: Response) => await this.userController.signOut(request, response));

    return this.router;
  }
}
