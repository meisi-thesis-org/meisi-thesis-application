import Express, { type Application } from 'express';
import 'dotenv/config';
import { connect, type ConsumeMessage } from 'amqplib';
import { InternalServerException } from './exceptions/internal-server.exception';

export class LoggerApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000');
  }

  public defineListner (): LoggerApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`);

      const connection = await connect(process.env.URL ?? 'amqp://localhost');
      const channel = await connection.createChannel();
      const queueDesignation = (process.env.QUEUE_DESIGNATION ?? 'exceptions');

      await channel.assertQueue(queueDesignation, { durable: false });
      await channel.consume(queueDesignation, (message: ConsumeMessage | null) => {
        if (message === null) {
          throw new InternalServerException();
        }

        // TODO: StoreLogs On DB
        console.log(message.content.toString())
      })
    })

    return this;
  }
}

new LoggerApplication().defineListner();
