import Express, { json, type Application } from 'express';
import 'dotenv/config';

export class LoggerApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000');
  }

  public defineMiddlewares (): LoggerApplication {
    this.application.use(json());

    return this;
  }

  public defineRoutes (): LoggerApplication {
    return this;
  }

  public defineListner (): LoggerApplication {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`);
    })

    return this;
  }
}

const loggerApplication = new LoggerApplication();

loggerApplication.defineMiddlewares();
loggerApplication.defineRoutes();
loggerApplication.defineListner();
