import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { DossierGateway } from './dossier.gateway';

export class DossierApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8004')
  }

  public defineMiddlewares (): DossierApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): DossierApplication {
    this.application.use('/commerce/dossiers', new DossierGateway().subscribe())

    return this;
  }

  public defineListner (): DossierApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new DossierApplication().defineMiddlewares().defineRoutes().defineListner();
