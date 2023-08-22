import { QueueProvider } from '@meisi-thesis/application-backend-shared/src/providers/queue.provider';
import Express, { type Application } from 'express';
import 'dotenv/config';

export class JournalApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8001')
  }

  public defineListner (): JournalApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
      const queueProvider = new QueueProvider();
      await queueProvider.consumeQueue(
        process.env.RABBITMQ_URL ?? 'amqplib://localhost',
        'create_exception',
        (message) => { console.log(message); }
      )
    })

    return this;
  }
}

new JournalApplication().defineListner();
