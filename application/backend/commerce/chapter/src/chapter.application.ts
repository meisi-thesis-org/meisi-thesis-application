import Express, { json, type Application } from 'express';
import 'dotenv/config';
import { ChapterGateway } from './chapter.gateway';

export class ChapterApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8006')
  }

  public defineMiddlewares (): ChapterApplication {
    this.application.use(json());
    return this;
  }

  public defineRoutes (): ChapterApplication {
    this.application.use('/commerce/chapters', new ChapterGateway().subscribe())

    return this;
  }

  public defineListner (): ChapterApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
    })

    return this;
  }
}

new ChapterApplication().defineMiddlewares().defineRoutes().defineListner();
