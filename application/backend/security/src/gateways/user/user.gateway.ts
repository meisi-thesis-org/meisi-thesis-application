import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../../../shared/src/abstracts/gateway.abstract';
import { UserController } from './user.controller';

export class UserGateway extends Gateway<Router> {
  private readonly controller: UserController = new UserController();
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this.router.post('/sign-up', (request: Request, response: Response) => {
      void this.controller.signUp(request, response);
    })

    this.router.get('/sign-in', (request: Request, response: Response) => {
      void this.controller.signIn(request, response);
    })

    this.router.put('/sign-out', (request: Request, response: Response) => {
      void this.controller.signOut(request, response);
    })

    return this.router;
  }
}
