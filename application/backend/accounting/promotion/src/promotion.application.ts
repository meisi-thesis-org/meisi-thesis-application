import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { PromotionGateway } from './promotion.gateway';

export class PromotionApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8008')
  }

  public defineMiddlewares (): PromotionApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): PromotionApplication {
    this.application.use('/security/promotion', new PromotionGateway().subscribe())
    return this;
  }

  public defineListner (): PromotionApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new PromotionApplication().defineMiddlewares().defineRoutes().defineListner();
