import Express, { type Application } from 'express';
import { QueueProvider } from '@meisi-thesis/application-backend-shared/src/providers/queue.provider';
import * as QueueProviders from '@meisi-thesis/application-backend-shared/src/providers/queue.provider.type'
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';

export class JournalApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000');
  }

  public defineListner (): void {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`);

      const queueProvider = new QueueProvider();
      const connectionURL = process.env.RABBITMQ_URL

      if (connectionURL === undefined) throw new InternalServerException();

      await queueProvider.consumeQueue(
        connectionURL,
        QueueProviders.Collection.REGISTER_EXCEPTION,
        (message) => {
          if (message === null) throw new InternalServerException();
        }
      ).catch(() => { throw new InternalServerException(); });
    })
  }
}

new JournalApplication().defineListner();
