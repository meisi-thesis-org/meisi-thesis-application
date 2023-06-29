import { Router } from 'express';
import { Gateway } from './shared/abstracts/gateway';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    return this.router;
  }
}
