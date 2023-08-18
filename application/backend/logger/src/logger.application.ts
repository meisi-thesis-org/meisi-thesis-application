import Express, { type Application } from 'express';
import 'dotenv/config';
import { connect, type ConsumeMessage } from 'amqplib';
import { InternalServerException } from './exceptions/internal-server.exception';
import { Client } from 'pg';
import { randomUUID } from 'crypto';

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
      await channel.consume(queueDesignation, async (message: ConsumeMessage | null) => {
        try {
          if (message === null) {
            throw new InternalServerException();
          }

          const client = new Client({
            host: process.env.PG_HOST ?? '192.168.1.64',
            port: parseInt(process.env.PORT ?? '5431'),
            database: process.env.PG_DB ?? 'root',
            user: process.env.PG_USER ?? 'root',
            password: process.env.PG_PSSW ?? 'root'
          });

          await client.connect()
          await client.query({
            name: 'create-exception',
            text: `INSERT INTO public.${queueDesignation}(uuid, content) VALUES($1, $2)`,
            values: [randomUUID(), message.content.toString()]
          })

          await client.end();
        } catch (error) {
          throw new InternalServerException();
        }
      })
    })

    return this;
  }
}

new LoggerApplication().defineListner();
