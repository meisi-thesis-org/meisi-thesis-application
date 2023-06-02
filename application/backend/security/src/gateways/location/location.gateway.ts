import { Router } from 'express';
import { Gateway } from '../../../../shared/abstracts/gateway.abstract';

export class LocationGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    return this.router;
  }
}
