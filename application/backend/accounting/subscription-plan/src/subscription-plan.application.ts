import Express, { json, type Application } from 'express';
import { SubscriptionPlanGateway } from './subscription-plan.gateway';
import 'dotenv/config';

export class SubscriptionPlanApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8007')
  }

  public defineMiddlewares (): SubscriptionPlanApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): SubscriptionPlanApplication {
    this.application.use('/security/subscription-plans', new SubscriptionPlanGateway().subscribe())
    return this;
  }

  public defineListner (): SubscriptionPlanApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new SubscriptionPlanApplication().defineMiddlewares().defineRoutes().defineListner();
