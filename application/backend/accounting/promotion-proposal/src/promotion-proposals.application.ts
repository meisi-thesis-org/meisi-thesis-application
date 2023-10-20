import Express, { json, type Application } from 'express';
import { PromotionProposalGateway } from './promotion-proposal.gateway';
import 'dotenv/config';

export class PromotionProposalApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8011')
  }

  public defineMiddlewares (): PromotionProposalApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): PromotionProposalApplication {
    this.application.use('/security/promotion-proposals', new PromotionProposalGateway().subscribe())
    return this;
  }

  public defineListner (): PromotionProposalApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new PromotionProposalApplication().defineMiddlewares().defineRoutes().defineListner();
