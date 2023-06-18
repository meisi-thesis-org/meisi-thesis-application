import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../../../shared/src/abstracts/gateway.abstract';
import { UserController } from './user.controller';
import { UserGatewayCollection } from './shared/collections/user-gateway.collection';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { SchemaValidatorMiddleware } from './../../../../shared/src/middlewares/schema-validator.middleware';
import { FetchUserSchema } from './schemas/fetch-user.schema';
import { SignUpSchema } from './schemas/sign-up.schema';
import { SignInSchema } from './schemas/sign-in.schema';
import { RefreshAccessCodeSchema } from './schemas/refresh-access-code.schema';

export class UserGateway extends Gateway<Router> {
  private readonly _controller: UserController = new UserController();

  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this._router.get('/:uuid',
      AccessTokenGuard,
      SchemaValidatorMiddleware(FetchUserSchema),
      (request: Request, response: Response) => {
        void this._controller.fetchUser(request, response)
      })

    this._router.post(
      UserGatewayCollection.SIGN_UP,
      SchemaValidatorMiddleware(SignUpSchema),
      (request: Request, response: Response) => {
        void this._controller.signUp(request, response)
      })

    this._router.put(
      UserGatewayCollection.SIGN_IN,
      SchemaValidatorMiddleware(SignInSchema),
      (request: Request, response: Response) => {
        void this._controller.signIn(request, response)
      })

    this._router.put(
      UserGatewayCollection.SIGN_OUT,
      AccessTokenGuard,
      (request: Request, response: Response) => {
        void this._controller.signOut(request, response)
      })

    this._router.put(
      UserGatewayCollection.REFRESH_ACCESS_CODE,
      SchemaValidatorMiddleware(RefreshAccessCodeSchema),
      (request: Request, response: Response) => {
        void this._controller.refreshAccessCode(request, response)
      })

    this._router.put(
      UserGatewayCollection.REFRESH_TOKENS,
      RefreshTokenGuard,
      (request: Request, response: Response) => {
        void this._controller.refreshTokens(request, response)
      })

    return this._router;
  }
}
