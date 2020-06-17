import nodemailer from 'nodemailer';

import env from '../env';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: `${env.email.address}`,
    pass: `${env.email.password}`
  }
});

export const sendResetEmail = (user, host, token) => {
  const mailOptions = {
    from: 'thread-JS@gmail.com',
    to: `${user.email}`,
    subject: 'Link to Reset Password',
    text: 'You are receiving this because you have requested the reset'
      + ' of the password for your account.\nPlease click on the following'
      + ' link, or paste it into browser address field to complete the'
      + ' process within one hour of receiving it:'
      + `\n${host}/reset/${token}\nIf you did not request this - please`
      + ' ignore this email and your password will remain unchanged.'
  };

  return transporter.sendMail(mailOptions);
};

export const sendSharedLinkEmail = ({ email, link }) => {
  const mailOptions = {
    from: 'thread-JS@gmail.com',
    to: `${email}`,
    subject: 'Link to Shared Post',
    text: 'You are receiving this because somebody shared a post with You.'
      + '\n Please click on the following link, or paste it into browser '
      + `address field to see shared post:\n${link}\nIf you did not `
      + 'want this - please ignore this email or delete it.'
  };

  return transporter.sendMail(mailOptions);
};

export const sendLikeNotificationEmail = email => {
  const mailOptions = {
    from: 'thread-JS@gmail.com',
    to: `${email}`,
    subject: 'Likes!!1!1!!!11!!111!!!!!',
    text: 'You are receiving this because somebody liked your post.\n Take our congratulations!!!'
  };

  transporter.sendMail(mailOptions, (err, response) => (err ? ({
    error: true,
    message: `there was an error: ${err}`
  }) : ({
    error: false,
    message: `here is the response: ${response}`
  })));
};
