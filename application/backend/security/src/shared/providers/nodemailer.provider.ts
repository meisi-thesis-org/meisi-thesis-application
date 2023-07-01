import { createTransport, type Transporter } from 'nodemailer';
import { InternalServerException } from '../exceptions/internal-server.exception';

export class NodemailerProvider {
  private static instance: NodemailerProvider | null = null;

  public static getInstance(): NodemailerProvider {
    if (this.instance === null) {
      this.instance = new NodemailerProvider();
    }

    return this.instance;
  }

  private createTransport(): Transporter {
    return createTransport({
      service: 'hotmail',
      host: 'smtp.hotmail.com',
      port: 465,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
      }
    });
  }

  public async sendEmail(
    toContact: string,
    contentSubject: string,
    contentText: string
  ): Promise<void> {
    try {
      const transporter = this.createTransport();

      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: toContact,
        subject: contentSubject,
        text: contentText
      });
    } catch (error) {
      console.log(error)
      throw new InternalServerException();
    }
  }
}
