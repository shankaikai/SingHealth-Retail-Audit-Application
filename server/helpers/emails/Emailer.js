const nodemailer = require("nodemailer");
var ejs = require("ejs");
const sendMail = (service, email, name) => {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });


  ejs.renderFile(__dirname + "/templates/test.ejs", { name: 'Stranger' }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        var mainOptions = {
            from: "esccprojectt@hotmail.com",
            to: email,
            subject: "Reset Password For SingHealth React-App",
            html: data
        };
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: ' + info.response);
            }
        });
    }
    
    });

  

  /*
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
  */
};
module.exports = sendMail