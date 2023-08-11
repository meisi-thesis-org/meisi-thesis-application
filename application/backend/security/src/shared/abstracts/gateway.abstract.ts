import { type Router } from 'express';

export abstract class Gateway {
  public constructor(
    protected readonly router: Router
  ) {}

  public abstract subscribeRouter(): Router;
}
