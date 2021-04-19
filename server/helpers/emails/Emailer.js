const nodemailer = require("nodemailer");
var ejs = require("ejs");
const sendMailResetPassword = (service, email, name) => {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });


  ejs.renderFile(__dirname + "/templates/resetpassword.ejs", { name: name, email:email }, function (err, data) {
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

  
};
module.exports.sendMailResetPassword = sendMailResetPassword