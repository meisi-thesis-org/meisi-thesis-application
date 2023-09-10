import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';

import Express, { type Application } from 'express';
import 'dotenv/config';

export class JournalApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8020')
  }

  public defineListner (): JournalApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
      const queueProvider = new QueueProvider();
      await queueProvider.consumeQueue(
        process.env.RABBITMQ_URL ?? 'amqp://localhost',
        'create_exception',
        (message) => { console.log(message?.content.toString()); }
      )
    })

    return this;
  }
}

new JournalApplication().defineListner();
