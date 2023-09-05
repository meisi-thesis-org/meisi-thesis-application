import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { UserGateway } from './user.gateway';

export class UserApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8001')
  }

  public defineMiddlewares (): UserApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): UserApplication {
    this.application.use('/security/users', new UserGateway().subscribe())
    return this;
  }

  public defineListner (): UserApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new UserApplication().defineMiddlewares().defineRoutes().defineListner();
