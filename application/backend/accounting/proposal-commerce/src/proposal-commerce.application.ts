import Express, { json, type Application } from 'express';
import { ProposalCommerceGateway } from './proposal-commerce.gateway';
import 'dotenv/config';

export class ProposalCommerceApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8013')
  }

  public defineMiddlewares (): ProposalCommerceApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): ProposalCommerceApplication {
    this.application.use('/security/proposal-commerces', new ProposalCommerceGateway().subscribe())
    return this;
  }

  public defineListner (): ProposalCommerceApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new ProposalCommerceApplication().defineMiddlewares().defineRoutes().defineListner();
