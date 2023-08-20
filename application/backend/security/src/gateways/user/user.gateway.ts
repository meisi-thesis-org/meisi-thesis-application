import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { Router } from 'express';

export class UserGateway extends Gateway<Router> {
  public constructor () {
    super(Router());
  }

  public subscribe (): Router {
    this.router.get('/', () => {});
    this.router.put('/', () => {});
    this.router.post('/sign-up', () => {});
    this.router.put('/sign-in', () => {});
    this.router.put('/sign-out', () => {});

    return this.router;
  }
}
