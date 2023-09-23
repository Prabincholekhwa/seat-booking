import { EmailOptions } from "../interfaces/helperInterfaces/mailInterface";
import * as Nodemailer from "nodemailer";

require('dotenv').config();

class MailSender {
  private static instance: MailSender;
  private transporter: Nodemailer.Transporter;

  private constructor( private mailAuth: Nodemailer.SentMessageInfo) {
    this.transporter = Nodemailer.createTransport({
      service: 'gmail',
      auth: this.mailAuth
    } as Nodemailer.TransportOptions);
  }

  static get( mailAuth: Nodemailer.SentMessageInfo): MailSender {
    if (!MailSender.instance) {
      MailSender.instance = new MailSender(mailAuth);
    }
    return MailSender.instance;
  }

  sendEmail = async (mailOptions:EmailOptions) => {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error('Error sending email:', err);
      throw new Error('Failed to send email. Please try again later.');
    }
  }
}

  
  const mailAuth = {
    type: 'OAUTH2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  };
const mailSender = MailSender.get(mailAuth);

export { mailSender as Mailsender };
