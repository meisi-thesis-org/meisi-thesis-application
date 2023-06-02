import { Router } from 'express';
import { Gateway } from '../../../../shared/abstracts/gateway.abstract';

export class DeviceGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    return this.router;
  }
}
