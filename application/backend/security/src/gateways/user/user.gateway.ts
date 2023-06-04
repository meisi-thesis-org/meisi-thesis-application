import { Router } from 'express';
import { Gateway } from '../../../../shared/abstracts/gateway.abstract';
import { UserGatewayCollection } from './collections/user-gateway.collection';

export class UserGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this._router.get((UserGatewayCollection.BASE), () => {})
    this._router.post((UserGatewayCollection.SIGN_UP), () => {})
    this._router.put((UserGatewayCollection.SIGN_IN), () => {})
    this._router.put((UserGatewayCollection.SIGN_OUT), () => {})
    this._router.put((UserGatewayCollection.REFRESH_ACCESS_CODE), () => {})
    this._router.put((UserGatewayCollection.REFRESH_TOKEN), () => {})
    this._router.put((UserGatewayCollection.BLOCK), () => {})
    this._router.put((UserGatewayCollection.UNBLOCK), () => {})
    this._router.put((UserGatewayCollection.ACTIVATE), () => {})
    this._router.put((UserGatewayCollection.DEACTIVATE), () => {})
    this._router.put((UserGatewayCollection.ACCEPT_PRIVACY_TERMS), () => {})

    return this._router;
  }
}
