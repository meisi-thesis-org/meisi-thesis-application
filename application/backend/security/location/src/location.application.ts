import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { LocationGateway } from './location.gateway';

export class LocationApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8003')
  }

  public defineMiddlewares (): LocationApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): LocationApplication {
    this.application.use('/security/locations', new LocationGateway().subscribe())
    return this;
  }

  public defineListner (): LocationApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new LocationApplication().defineMiddlewares().defineRoutes().defineListner();
