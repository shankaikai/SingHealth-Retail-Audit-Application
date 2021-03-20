const nodemailer = require("nodemailer");

module.exports = () => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });

  const mailOptions = {
    from: "esccprojectt@hotmail.com",
    to: "tiongshankai97@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
