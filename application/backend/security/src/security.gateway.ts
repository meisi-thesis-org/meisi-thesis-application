import { Router } from 'express';
import { Gateway } from './../../shared/src/abstracts/gateway.abstract';
import { UserGateway } from './gateways/user/user.gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    this.router.use(('/users'), new UserGateway().subscribe());

    return this.router;
  }
}
