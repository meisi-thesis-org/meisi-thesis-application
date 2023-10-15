import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { CampaignPromotionGateway } from './campaign-promotion.gateway';

export class CampaignPromotionApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8011')
  }

  public defineMiddlewares (): CampaignPromotionApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): CampaignPromotionApplication {
    this.application.use('/security/campaign-promotions', new CampaignPromotionGateway().subscribe())
    return this;
  }

  public defineListner (): CampaignPromotionApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new CampaignPromotionApplication().defineMiddlewares().defineRoutes().defineListner();
