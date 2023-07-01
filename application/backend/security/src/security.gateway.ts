import { Router } from 'express';
import { Gateway } from './shared/abstracts/gateway';
import { SecurityGatewayCollection } from './shared/collections/security-gateway.collection';
import { UserGateway } from './gateways/users/user.gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this.router.use(SecurityGatewayCollection.USERS, new UserGateway().subscribe());

    return this.router;
  }
}
