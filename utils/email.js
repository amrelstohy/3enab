const nodemailer = require("nodemailer");

const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email.to,
    subject: email.subject,
    text: email.text,
  };

  await transporter.sendMail(mailOptions);
};

// const verificationEmailMessage = `
//   <h1>Email Verification</h1>
//   <p>Click the link to verify your email: ${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}</p>
// `;

module.exports = {
  sendEmail,
  //   verificationEmailMessage,
};
