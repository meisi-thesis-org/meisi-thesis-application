import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../shared/abstracts/gateway.abstract';
import { UserGatewayCollection } from './shared/collections/user-gateway.collection';
import { UserController } from './user.controller';

export class UserGateway extends Gateway {
  private readonly controller: UserController;

  public constructor() {
    super(Router());

    this.controller = new UserController();
  }

  public override subscribeRouter(): Router {
    this.router.post(UserGatewayCollection.SIGN_UP, (request: Request, response: Response) => {
      void this.controller.signUp(request, response);
    })
    this.router.put(UserGatewayCollection.SIGN_IN, (request: Request, response: Response) => {
      void this.controller.signIn(request, response);
    })
    this.router.put(UserGatewayCollection.RECOVER_ACCESS_CODE, (request: Request, response: Response) => {
      void this.controller.recoverAccessCode(request, response);
    })

    return this.router;
  }
}
