import { Router } from 'express';
import { Gateway } from './../../shared/src/abstracts/gateway.abstract';
import { SecurityGatewayCollection } from './shared/collections/security-gateway.collection';
import { UserGateway } from './gateways/user/user.gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this._router.use(SecurityGatewayCollection.USERS, () => new UserGateway().subscribe());
    return this._router;
  }
}
