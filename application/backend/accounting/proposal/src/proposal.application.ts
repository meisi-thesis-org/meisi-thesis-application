import Express, { json, type Application } from 'express';
import { ProposalGateway } from './proposal.gateway';
import 'dotenv/config';

export class ProposalApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8007')
  }

  public defineMiddlewares (): ProposalApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): ProposalApplication {
    this.application.use('/security/proposals', new ProposalGateway().subscribe())
    return this;
  }

  public defineListner (): ProposalApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new ProposalApplication().defineMiddlewares().defineRoutes().defineListner();
