import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { NetworkGateway } from './network.gateway';

export class NetworkApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8003')
  }

  public defineMiddlewares (): NetworkApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): NetworkApplication {
    this.application.use('/security/networks', new NetworkGateway().subscribe())
    return this;
  }

  public defineListner (): NetworkApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new NetworkApplication().defineMiddlewares().defineRoutes().defineListner();
