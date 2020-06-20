import nodemailer from 'nodemailer';

import env from '../env';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: `${env.email.address}`,
    pass: `${env.email.password}`
  }
});
