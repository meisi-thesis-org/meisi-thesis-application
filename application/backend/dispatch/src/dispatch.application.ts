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
      try {
        const queueProvider = new QueueProvider();
        const connectionURL = process.env.RABBITMQ_URL;

        if (connectionURL === undefined) throw new Error();

        await queueProvider.consumeQueue(
          connectionURL,
          QueueProviders.Collection.REGISTER_EMAIL,
          async (message) => {
            const sanitizedMessage: Record<string, string | undefined> = message !== null ? JSON.parse(message.content.toString()) : '{}';
            const parsedSchema = dispatchSchema.safeParse(sanitizedMessage);

            await queueProvider.sendQueue(
              connectionURL,
              QueueProviders.Collection.REGISTER_EMAIL,
              Buffer.from(JSON.stringify({
                severity: !parsedSchema.success ? 'Error' : 'Info',
                correlationUuid: sanitizedMessage.correlationUuid,
                url: sanitizedMessage.url,
                cause: parsedSchema.success ? parsedSchema.data : parsedSchema.error
              })))

            if (parsedSchema.success) {
              const transporter = nodemailer.createTransport({
                host: 'smtp.forwardemail.net',
                port: Number(process.env.MAILER_PORT),
                secure: true,
                auth: {
                  user: process.env.MAILER_USER,
                  pass: process.env.MAILER_PSW
                }
              });

              await transporter.sendMail({
                from: process.env.MAILER_USER,
                to: parsedSchema.data.toEmail,
                subject: parsedSchema.data.subject,
                text: parsedSchema.data.content
              });
            }
          }
        )
      } catch (error) {
        throw new InternalServerException(JSON.stringify(error));
      }
    })
  }
}

new DispatchApplication().defineListner();
