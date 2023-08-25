import { Gateway } from '@meisi-thesis/application-backend-shared/src/abstracts/gateway.abstract';
import { type Request, type Response, Router } from 'express';
import { ConnectionController } from './connection.controller';

export class ConnectionGateway extends Gateway<Router> {
  private readonly connectionController = new ConnectionController();

  public constructor () {
    super(Router());
  }

  public subscribe (): Router {
    this.router.put(
      '/:uuid/refresh-tokens',
      async (request: Request, response: Response) =>
        await this.connectionController.refreshTokens(request, response)
    )

    return this.router;
  }
}
