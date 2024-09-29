const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.TYPE_MAILER_SERVICE, // Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendPasswordResetEmail = (to, token) => {
  const mailOptions = {
    from: "italodasilva67@hotmail.com",
    to: to,
    subject: "Recuperação de Senha",
    text: `Você solicitou a recuperação de senha. 
    Copie o token e informe para recuperar sua senha!
    token: ${token}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendPasswordResetEmail;
