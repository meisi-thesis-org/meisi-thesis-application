import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../../../shared/src/abstracts/gateway.abstract';
import { UserController } from './user.controller';
import { UserGatewayCollection } from './shared/collections/user-gateway.collection';
import { AccessTokenGuard } from './guards/access-token.guard';

export class UserGateway extends Gateway<Router> {
  private readonly _controller: UserController = new UserController();

  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this._router.get('/:uuid', AccessTokenGuard, (request: Request, response: Response) => {
      void this._controller.fetchUser(request, response)
    })

    this._router.post(UserGatewayCollection.SIGN_UP, (request: Request, response: Response) => {
      void this._controller.signUp(request, response)
    })

    this._router.put(UserGatewayCollection.SIGN_IN, (request: Request, response: Response) => {
      void this._controller.signIn(request, response)
    })

    this._router.put(UserGatewayCollection.SIGN_OUT, AccessTokenGuard, (request: Request, response: Response) => {
      void this._controller.signOut(request, response)
    })

    this._router.put(UserGatewayCollection.REFRESH_ACCESS_CODE, (request: Request, response: Response) => {
      void this._controller.refreshAccessCode(request, response)
    })

    this._router.put(UserGatewayCollection.REFRESH_TOKENS, AccessTokenGuard, (request: Request, response: Response) => {
      void this._controller.refreshTokens(request, response)
    })

    return this._router;
  }
}
