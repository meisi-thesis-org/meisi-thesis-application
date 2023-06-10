import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../../../shared/src/abstracts/gateway.abstract';
import { UserController } from './user.controller';
import { UserGatewayCollection } from './shared/collections/user-gateway.collection';

export class UserGateway extends Gateway<Router> {
  private readonly _controller: UserController = new UserController();

  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this._router.get('/:uuid', (request: Request, response: Response) => {
      void this._controller.fetchUser(request, response)
    })

    this._router.post(UserGatewayCollection.SIGN_UP, (request: Request, response: Response) => {
      void this._controller.signUp(request, response)
    })

    return this._router;
  }
}
