import Express, { type Application } from 'express';
import { SecurityGateway } from './security.gateway';

export class SecurityApplication {
  private readonly _application: Application = Express();
  private readonly _serverPort: number = 8080;

  public defineConfigurations(): SecurityApplication {
    return this;
  }

  public defineRoutes(): SecurityApplication {
    this._application.all('*', new SecurityGateway().subscribe())
    return this;
  }

  public defineListner(): SecurityApplication {
    this._application.listen((this._serverPort), () => {
      console.log(`Server initialized on PORT:${this._serverPort}`);
    })

    return this;
  }
}

new SecurityApplication().defineConfigurations().defineRoutes().defineListner()
