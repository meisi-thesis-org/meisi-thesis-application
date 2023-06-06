import { type Request, type Response, Router } from 'express';
import { Gateway } from '../../../../shared/src/abstracts/gateway.abstract';
import { UserGatewayCollection } from './collections/user-gateway.collection';
import { UserController } from './user.controller';

export class UserGateway extends Gateway<Router> {
  private readonly _controller: UserController = new UserController();

  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    const {
      BASE,
      SIGN_UP,
      SIGN_IN,
      SIGN_OUT,
      REFRESH_CODE,
      REFRESH_TOKEN,
      BLOCK,
      UNBLOCK,
      ACTIVATE,
      DEACTIVATE,
      ACCEPT_PRIVACY_TERMS,
      REFUSE_PRIVACY_TERMS
    } = UserGatewayCollection;

    this._router.get(BASE, (request: Request, response: Response) => {
      void this._controller.fetchUser(request, response);
    });

    this._router.get(SIGN_UP, (request: Request, response: Response) => {
      void this._controller.signUp(request, response);
    });

    this._router.get(SIGN_IN, (request: Request, response: Response) => {
      void this._controller.signIn(request, response);
    });

    this._router.get(SIGN_OUT, (request: Request, response: Response) => {
      void this._controller.signOut(request, response);
    });

    this._router.get(REFRESH_CODE, (request: Request, response: Response) => {
      void this._controller.refreshCode(request, response);
    });

    this._router.get(REFRESH_TOKEN, (request: Request, response: Response) => {
      void this._controller.refreshToken(request, response);
    });

    this._router.get(BLOCK, (request: Request, response: Response) => {
      void this._controller.block(request, response);
    });

    this._router.get(UNBLOCK, (request: Request, response: Response) => {
      void this._controller.unblock(request, response);
    });

    this._router.get(DEACTIVATE, (request: Request, response: Response) => {
      void this._controller.deactivate(request, response);
    });

    this._router.get(ACTIVATE, (request: Request, response: Response) => {
      void this._controller.activate(request, response);
    });

    this._router.get(ACCEPT_PRIVACY_TERMS, (request: Request, response: Response) => {
      void this._controller.acceptPrivacyTerms(request, response);
    });

    this._router.get(REFUSE_PRIVACY_TERMS, (request: Request, response: Response) => {
      void this._controller.refusePrivacyTerms(request, response);
    });

    return this._router;
  }
}
