const nodemailer = require("nodemailer");
var ejs = require("ejs");
const sendNewStaffMail = (email) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });

  ejs.renderFile(
    __dirname + "/templates/newstaffaccount.ejs",
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: "esccprojectt@hotmail.com",
          to: email,
          subject: "Register for a new staff account",
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
module.exports.sendNewStaffMail = sendNewStaffMail;
