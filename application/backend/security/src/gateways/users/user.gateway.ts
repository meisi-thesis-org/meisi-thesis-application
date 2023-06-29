import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../shared/abstracts/gateway';
import { UserGatewayCollection } from './shared/collections/user-gateway.collection';
import { UserController } from './user.controller';

export class UserGateway extends Gateway<Router> {
  private readonly controller: UserController = new UserController();

  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this.router.post(UserGatewayCollection.SIGN_UP, (request: Request, response: Response) => {
      void this.controller.signUp(request, response);
    });

    this.router.put(UserGatewayCollection.SIGN_IN, (request: Request, response: Response) => {
      void this.controller.signIn(request, response);
    });

    this.router.put(UserGatewayCollection.SIGN_OUT, (request: Request, response: Response) => {
      void this.controller.signOut(request, response);
    });

    this.router.put(UserGatewayCollection.REFRESH_ACCESS_CODE, (request: Request, response: Response) => {
      void this.controller.refreshAccessCode(request, response);
    });

    this.router.put(UserGatewayCollection.REFRESH_TOKENS, (request: Request, response: Response) => {
      void this.controller.refreshTokens(request, response);
    });

    return this.router;
  }
}
