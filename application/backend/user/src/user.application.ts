import Express, { type Application } from 'express';
import 'dotenv/config';

export class UserApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8080');
  }

  public defineMiddlewares (): void {}

  public defineRoutes (): void {
    this.application.post('/sign-up', () => {});
    this.application.put('/sign-in', () => {});
    this.application.put('/recover-access-code', () => {});
  }

  public defineListner (): void {
    this.application.listen((this.serverPort), () => {
      console.log(`Server initialized on PORT:${this.serverPort}!`)
    })
  }
}

const userApplication = new UserApplication();

userApplication.defineMiddlewares();
userApplication.defineRoutes();
userApplication.defineListner();
