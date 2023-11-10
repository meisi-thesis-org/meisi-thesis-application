import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { PageGateway } from './page.gateway';

export class PageApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8007')
  }

  public defineMiddlewares (): PageApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): PageApplication {
    this.application.use('/accounting/pages', new PageGateway().subscribe())

    return this;
  }

  public defineListner (): PageApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new PageApplication().defineMiddlewares().defineRoutes().defineListner();
