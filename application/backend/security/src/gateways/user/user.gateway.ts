import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../../../shared/src/abstracts/gateway.abstract';
import { UserController } from './user.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

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

    this.router.put('/sign-out', AccessTokenGuard, (request: Request, response: Response) => {
      void this.controller.signOut(request, response);
    })

    this.router.put('/refresh-token', RefreshTokenGuard, (request: Request, response: Response) => {
      void this.controller.refreshToken(request, response);
    })

    return this.router;
  }
}
