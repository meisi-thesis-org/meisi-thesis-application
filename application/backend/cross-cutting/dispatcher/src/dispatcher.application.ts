import Express, { type Application } from 'express';
import 'dotenv/config';
import { DispatcherSchema } from './dispatcher.schema';
import * as nodemailer from 'nodemailer';
import { QueueProvider } from '@meisi-thesis/application-backend-utilities-shared/src/providers/queue.provider';

export class DispatcherApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8010')
  }

  public defineListner (): DispatcherApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`)
      const queueProvider = new QueueProvider();

      const rabbitMQURL = process.env.RABBITMQ_URL ?? 'amqp://localhost'

      try {
        await queueProvider.consumeQueue(
          rabbitMQURL,
          'create_email',
          async (message) => {
            if (message === null) {
              const bufferedMessage = Buffer.from(JSON.stringify(message))
              return await queueProvider.sendQueue(rabbitMQURL, 'create_exception', bufferedMessage)
            }

            const parsedContent = JSON.parse(message.content.toString())
            const parsedSchema = DispatcherSchema.safeParse(parsedContent);

            if (!parsedSchema.success) {
              const bufferedError = Buffer.from(JSON.stringify(parsedSchema.error))
              return await queueProvider.sendQueue(rabbitMQURL, 'create_exception', bufferedError)
            }

            const transporter = nodemailer.createTransport({
              service: process.env.NODEMAILER_HOST,
              port: parseInt(process.env.NODEMAILER_PORT ?? '587'),
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
        const bufferedMessage = Buffer.from(JSON.stringify(error))
        return await queueProvider.sendQueue(rabbitMQURL, 'create_exception', bufferedMessage)
      }
    })

    return this;
  }
}

new DispatcherApplication().defineListner();
