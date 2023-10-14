import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { CampaignGateway } from './campaign.gateway';

export class CampaignApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8008')
  }

  public defineMiddlewares (): CampaignApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): CampaignApplication {
    this.application.use('/security/campaigns', new CampaignGateway().subscribe())
    return this;
  }

  public defineListner (): CampaignApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new CampaignApplication().defineMiddlewares().defineRoutes().defineListner();
