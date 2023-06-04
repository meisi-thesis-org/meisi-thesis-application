import Express, { type Application } from 'express'

export class SecurityApplication {
  private readonly _application: Application = Express();
  private readonly _serverPort: number = 8080;

  public defineMiddlewares(): SecurityApplication {
    return this;
  }

  public defineRoutes(): SecurityApplication {
    return this;
  }

  public defineListner(): SecurityApplication {
    this._application.listen((this._serverPort), () => {
      console.log(`Server initialized on PORT:${this._serverPort}`);
    })

    return this;
  }
}

new SecurityApplication().defineMiddlewares().defineRoutes().defineListner()
