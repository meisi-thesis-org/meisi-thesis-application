import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { SubscriptionPlanContentGatewayGateway } from './subscription-plan-content.gateway';

export class SubscriptionPlanContentApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8012')
  }

  public defineMiddlewares (): SubscriptionPlanContentApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): SubscriptionPlanContentApplication {
    this.application.use('/security/subscription-plan-contents', new SubscriptionPlanContentGatewayGateway().subscribe())
    return this;
  }

  public defineListner (): SubscriptionPlanContentApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new SubscriptionPlanContentApplication().defineMiddlewares().defineRoutes().defineListner();
