import { Router } from 'express';
import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { UserGateway } from './gateways/user/user.gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor () {
    super(Router());
  }

  public subscribe (): Router {
    this.router.use('/users', new UserGateway().subscribe());
    return this.router;
  }
}
