import { Router } from 'express';
import { Gateway } from './../../shared/src/abstracts/gateway.abstract';

export class SecurityGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    return this._router;
  }
}
