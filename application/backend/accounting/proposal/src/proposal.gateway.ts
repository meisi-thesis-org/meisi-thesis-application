import { Gateway } from '@meisi-thesis/application-backend-utilities-shared/src/abstracts/gateway.abstract'
import { Router } from 'express';

export class ProposalGateway extends Gateway<Router> {
  public constructor () {
    super(Router())
  }

  public override subscribe (): Router {
    return this.router;
  }
}
