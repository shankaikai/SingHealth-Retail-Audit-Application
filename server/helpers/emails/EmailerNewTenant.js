const nodemailer = require("nodemailer");
var ejs = require("ejs");
const sendNewTenantMail = (email, name, password) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });

  ejs.renderFile(
    __dirname + "/templates/newtenantaccount.ejs",
    { name: name, email: email, password: password },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: "esccprojectt@hotmail.com",
          to: email,
          subject:
            "Temporary login credentials for SingHealth Retail Audit Application",
          html: data,
        };
        console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      }
    }
  );
};
module.exports = sendNewTenantMail;
