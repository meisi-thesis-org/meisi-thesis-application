import { Router } from 'express';
import { Gateway } from '../../abstracts/gateway';

export class UserGateway extends Gateway<Router> {
  public constructor() {
    super(Router());
  }

  public override subscribe(): Router {
    return this.router;
  }
}
