import { QueueProvider } from '@meisi-thesis/application-backend-shared/src/providers/queue.provider';
import Express, { type Application } from 'express';
import 'dotenv/config';
import { DispatcherSchema } from './dispatcher.schema';
import * as nodemailer from 'nodemailer';

export class DispatcherApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8002')
  }

  public defineListner (): DispatcherApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
      const queueProvider = new QueueProvider();

      try {
        await queueProvider.consumeQueue(
          process.env.RABBITMQ_URL ?? 'amqplib://localhost',
          'create_email',
          async (message) => {
            if (message === null) {
              await queueProvider.sendQueue(
                process.env.RABBITMQ_URL ?? 'amqplib://localhost',
                'create_exception',
                Buffer.from(JSON.stringify(message))
              )

              return;
            }

            const parsedSchema = DispatcherSchema.safeParse(message?.content);

            if (!parsedSchema.success) {
              await queueProvider.sendQueue(
                process.env.RABBITMQ_URL ?? 'amqplib://localhost',
                'create_exception',
                Buffer.from(JSON.stringify(parsedSchema.error))
              )

              return;
            }

            const transporter = nodemailer.createTransport({
              host: process.env.NODEMAILER_HOST,
              port: parseInt(process.env.NODEMAILER_PORT ?? '465'),
              secure: Boolean(process.env.NODEMAILER_SECURE),
              auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PSSW
              }
            })

            await transporter.sendMail({
              from: process.env.NODEMAILER_USER,
              to: parsedSchema.data.toEmail,
              subject: parsedSchema.data.subject,
              text: parsedSchema.data.content
            });
          }
        )
      } catch (error) {
        console.log(error)
      }
    })

    return this;
  }
}

new DispatcherApplication().defineListner();
