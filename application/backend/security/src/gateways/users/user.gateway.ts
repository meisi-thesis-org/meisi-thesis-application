import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../shared/abstracts/gateway';
import { UserGatewayCollection } from './shared/collections/user-gateway.collection';
import { UserController } from './user.controller';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { SignUpSchema } from './schemas/sign-up.schema';
import { SignInSchema } from './schemas/sign-in.schema';
import { RefreshAccessCodeSchema } from './schemas/refresh-access-code.schema';
import { SchemaValidatorMiddleware } from '../../shared/middlewares/schema-validator.middleware';

export class UserGateway extends Gateway<Router> {
  private readonly controller: UserController = new UserController();

  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this.router.get(
      UserGatewayCollection.BASE,
      AccessTokenGuard,
      async (request: Request, response: Response) => {
        void this.controller.fetchUser(request, response);
      });

    this.router.post(
      UserGatewayCollection.SIGN_UP,
      SchemaValidatorMiddleware(SignUpSchema),
      async (request: Request, response: Response) => {
        void this.controller.signUp(request, response);
      });

    this.router.put(
      UserGatewayCollection.SIGN_IN,
      SchemaValidatorMiddleware(SignInSchema),
      (request: Request, response: Response) => {
        void this.controller.signIn(request, response);
      });

    this.router.put(
      UserGatewayCollection.SIGN_OUT,
      AccessTokenGuard,
      (request: Request, response: Response) => {
        void this.controller.signOut(request, response);
      });

    this.router.put(
      UserGatewayCollection.REFRESH_ACCESS_CODE,
      SchemaValidatorMiddleware(RefreshAccessCodeSchema),
      (request: Request, response: Response) => {
        void this.controller.refreshAccessCode(request, response);
      });

    this.router.put(
      UserGatewayCollection.REFRESH_TOKENS,
      RefreshTokenGuard,
      (request: Request, response: Response) => {
        void this.controller.refreshTokens(request, response);
      });

    return this.router;
  }
}
