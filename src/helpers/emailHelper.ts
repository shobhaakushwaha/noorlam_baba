// helpers/emailHelper.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const { MAIL_USER, MAIL_PASS, HOST, PORT, FROM_NAME } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: HOST,
  port: Number(PORT) || 587,
  secure: false,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<boolean> => {
  try {
    const mailOptions = {
      from: `${FROM_NAME || 'App Name'} <${MAIL_USER}>`,
      to,
      subject,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);
    return true;
  } catch (err: any) {
    console.error(`❌ Failed to send email to ${to}: ${err.message}`);
    return false;
  }
};