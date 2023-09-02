import { Router } from 'express';
import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';

export class CommerceGateway extends Gateway<Router> {
  public constructor () {
    super(Router());
  }

  public subscribe (): Router {
    return this.router;
  }
}