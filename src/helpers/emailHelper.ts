const nodemailer = require('nodemailer');
require('dotenv').config();

const {
  MAIL_USER,
  MAIL_PASS,
  MAIL_HOST,
  MAIL_PORT,
  FROM_NAME,
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT) || 587,
  secure: false,
  // auth: {
  //   user: MAIL_USER,
  //   pass: MAIL_PASS,
  // },


    // auth: {
  //   user: MAIL_USER,
  //   pass: MAIL_PASS,
  // },



   auth: {
   user:"rahuldummyemail@gmail.com",
     pass:"rahul@123",
   },
});

const sendEmail = async ({ to, subject, html }) => {
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
  } catch (err) {
    console.error(`❌ Failed to send email to ${to}: ${err.message}`);
    return false;
  }
};

export default sendEmail;