import { type Router } from 'express';

export abstract class IRouter {
  public constructor(
    protected readonly router: Router
  ) {}

  public abstract subscribeRouter(): Router;
}
