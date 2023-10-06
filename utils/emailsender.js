const nodeMailer = require('nodemailer');

module.exports = async (email, subject, text) => {
  const transport = nodeMailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  try {
    await transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Email sent successfully');
  } catch (ex) {
    console.log(ex, 'error');
  }
};
