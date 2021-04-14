const nodemailer = require("nodemailer");
var ejs = require("ejs");
const sendMailResetPassword = (service, email, issue) => {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });


  ejs.renderFile(__dirname + "/templates/prompt.ejs", { name: issue[0].name, title: issue[0].title, description: issue[0].description, image: issue[0].imageUrl }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        var mainOptions = {
            from: "esccprojectt@hotmail.com",
            to: email,
            subject: `[ISSUE RECTIFICATION]: ${issue[0].title}`,
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
module.exports = sendMailResetPassword