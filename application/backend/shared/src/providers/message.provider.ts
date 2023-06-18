import * as nodemailer from 'nodemailer';

export class MessageProvider {
  public async sendEmail(userEmail: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      host: 'smtp-mail.outlook.com',
      auth: {
        user: 'e-bookler-01@hotmail.com',
        pass: 'auth-pass-01'
      }
    });

    await transporter.sendMail({
      from: 'e-bookler-01@hotmail.com',
      to: userEmail,
      subject,
      text
    });
  }
}
