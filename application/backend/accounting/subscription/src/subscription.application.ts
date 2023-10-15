import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { SubscriptionGateway } from './subscription.gateway';

export class SubscriptionApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8008')
  }

  public defineMiddlewares (): SubscriptionApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): SubscriptionApplication {
    this.application.use('/security/subscriptions', new SubscriptionGateway().subscribe())
    return this;
  }

  public defineListner (): SubscriptionApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new SubscriptionApplication().defineMiddlewares().defineRoutes().defineListner();
