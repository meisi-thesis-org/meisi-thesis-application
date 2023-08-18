import Express, { type Application } from 'express';
import 'dotenv/config';
import { connect, type ConsumeMessage } from 'amqplib';
import { InternalServerException } from './exceptions/internal-server.exception';
import * as nodemailer from 'nodemailer';

export class MailerApplication {
  private readonly application: Application;
  private readonly serverPort: number;

  public constructor () {
    this.application = Express();
    this.serverPort = parseInt(process.env.SERVER_PORT ?? '8000');
  }

  public defineListner (): MailerApplication {
    this.application.listen((this.serverPort), async () => {
      console.log(`Server initialized on PORT: ${this.serverPort}!`);

      const connection = await connect(process.env.URL ?? 'amqp://localhost');
      const channel = await connection.createChannel();
      const queueDesignation = (process.env.QUEUE_DESIGNATION ?? 'exceptions');
      await channel.purgeQueue(queueDesignation);

      await channel.assertQueue(queueDesignation, { durable: false });

      await channel.consume(queueDesignation, async (message: ConsumeMessage | null) => {
        if (message === null) {
          throw new InternalServerException();
        }

        const parsedMessage: {
          toEmail: string | undefined
          subject: string | undefined
          text: string | undefined
        } = JSON.parse(message.content.toString())

        if (
          (parsedMessage.toEmail === undefined) ||
          (parsedMessage.subject === undefined) ||
          (parsedMessage.text === undefined)
        ) {
          return channel.sendToQueue('Exceptions', Buffer.from(JSON.stringify({
            type: 'error',
            properties: parsedMessage,
            cause: 'Required Property Missing'
          })));
        }

        const transporter = nodemailer.createTransport({
          host: 'smtp.forwardemail.net',
          port: 465,
          secure: true,
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
          }
        });

        await transporter.sendMail({
          from: process.env.NODEMAILER_EMAIL,
          to: parsedMessage.toEmail,
          subject: parsedMessage.subject,
          text: parsedMessage.text
        }).catch(async (error) => {
          return channel.sendToQueue('Exceptions', Buffer.from(JSON.stringify({
            type: 'error',
            properties: parsedMessage,
            cause: error
          })));
        });
      })
    })

    return this;
  }
}

new MailerApplication().defineListner();
