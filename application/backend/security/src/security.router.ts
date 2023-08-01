import { Router } from 'express';
import { IRouter } from './shared/abstracts/router.abstracts';

export class SecurityRouter extends IRouter {
  public constructor() {
    super(Router());
  }

  public override subscribeRouter(): Router {
    return this.router;
  }
}
