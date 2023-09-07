import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { BookGateway } from './book.gateway';

export class BookApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8006')
  }

  public defineMiddlewares (): BookApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): BookApplication {
    this.application.use('/commerce/books', new BookGateway().subscribe())

    return this;
  }

  public defineListner (): BookApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new BookApplication().defineMiddlewares().defineRoutes().defineListner();
