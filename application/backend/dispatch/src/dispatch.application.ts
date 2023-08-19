import Express, { type Application } from 'express';
import { QueueProvider } from '@meisi-thesis/application-backend-shared/src/providers/queue.provider';
import * as QueueProviders from '@meisi-thesis/application-backend-shared/src/providers/queue.provider.type'
import { InternalServerException } from '@meisi-thesis/application-backend-shared/src/exceptions/internal-server.exception';
import * as nodemailer from 'nodemailer';
import { dispatchSchema } from './dispatch.schema';

export class DispatchApplication {
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
        QueueProviders.Collection.REGISTER_EMAIL,
        async (message) => {
          const parsedMessage: Record<string, string | undefined> = JSON.parse((message != null) ? message.content.toString() : '{}');
          const parsedSchema = dispatchSchema.safeParse(parsedMessage);

          await queueProvider.sendQueue(
            connectionURL,
            QueueProviders.Collection.REGISTER_EMAIL,
            Buffer.from(JSON.stringify({
              severity: !parsedSchema.success ? 'Error' : 'Info',
              correlationUuid: parsedMessage.correlationUuid,
              URL: parsedMessage.URL,
              cause: parsedSchema.success ? parsedSchema.data : parsedSchema.error
            })))

          const transporter = nodemailer.createTransport({});
          await transporter.sendMail({});
        }
      ).catch(() => { throw new InternalServerException(); });
    })
  }
}

new DispatchApplication().defineListner();
