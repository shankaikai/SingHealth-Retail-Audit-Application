const nodemailer = require("nodemailer");
const sendMail = (service, email, name) => {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });

  const mailOptions = {
    from: "esccprojectt@hotmail.com",
    to: email,
    subject: "Reset Password For SingHealth React-App",
    text: `Dear ${name}, \nWe have received your request to reset your password. \nHave a nice day! \nRegards, \nSingHeath`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports = sendMail