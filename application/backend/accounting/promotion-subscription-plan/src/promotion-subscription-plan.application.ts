import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { PromotionSubscriptionPlanGateway } from './promotion-subscription-plan.gateway';

export class PromotionSubscriptionPlanApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8012')
  }

  public defineMiddlewares (): PromotionSubscriptionPlanApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): PromotionSubscriptionPlanApplication {
    this.application.use('/security/promotion-subscription-plans', new PromotionSubscriptionPlanGateway().subscribe())
    return this;
  }

  public defineListner (): PromotionSubscriptionPlanApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new PromotionSubscriptionPlanApplication().defineMiddlewares().defineRoutes().defineListner();
