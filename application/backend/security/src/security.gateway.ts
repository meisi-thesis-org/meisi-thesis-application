import { Router } from 'express';
import { Gateway } from '../../shared/abstracts/gateway.abstract';
import { SecurityGatewayCollection } from './shared/collections/security-gateway.collection';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this._router.use(SecurityGatewayCollection.USER, () => ({}));
    this._router.use(SecurityGatewayCollection.DEVICE, () => ({}));
    this._router.use(SecurityGatewayCollection.LOCATION, () => ({}));

    return this._router;
  }
}
