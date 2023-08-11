import { Router } from 'express';
import { Gateway } from './shared/abstracts/gateway.abstract';
import { SecurityGatewayCollection } from './shared/collections/security-gateway.collection';
import { UserGateway } from './gateways/users/user.gateway';

export class SecurityGateway extends Gateway {
  public constructor() {
    super(Router());
  }

  public override subscribeRouter(): Router {
    this.router.use(SecurityGatewayCollection.USERS, new UserGateway().subscribeRouter());
    return this.router;
  }
}
