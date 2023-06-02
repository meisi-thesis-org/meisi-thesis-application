import Express, { type Application } from 'express'

export class SecurityApplication {
  private readonly application: Application = Express();
  private readonly serverPort: number = 8080;

  public defineMiddleware(): SecurityApplication {
    return this;
  }

  public defineRoutes(): SecurityApplication {
    return this;
  }

  public defineListner(): SecurityApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}`);
    })

    return this;
  }
}

new SecurityApplication().defineMiddleware().defineRoutes().defineListner();
