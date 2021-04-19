const nodemailer = require("nodemailer");
var ejs = require("ejs");
const pdf = require("html-pdf");

async function sendReportMail(service, email, data, auditID) {
  const transporter = nodemailer.createTransport({
    service: service,
    auth: {
      user: "esccprojectt@hotmail.com",
      pass: "wearethebest123",
    },
  });
  console.log("send report mail called");
  ejs.renderFile(
    __dirname + "/templates/exportaudit.ejs",
    {
      audit: data.audit,
      scores: data.scores,
      dateStarted: data.audit.dateStarted.toDateString(),
      dateCompleted: data.audit.dateCompleted.toDateString(),
      issues: data.issues,
    },
    function (err, out) {
      if (err) {
        console.log(err);
      } else {
        let options = {
          height: "11.69in",
          width: "8.27in",
        };
        pdf
          .create(out, options)
          .toFile(
            __dirname + "/temp/auditreport_" + auditID + ".pdf",
            (err, report) => {
              if (err) {
                console.log(err);
              } else {
                var mainOptions = {
                  from: "esccprojectt@hotmail.com",
                  to: email,
                  subject: `Audit Report: ${data.audit.dateStarted
                    .toDateString()
                    .slice(4)}`,
                  html: "<p>Attached is the requested audit report.</p>",
                  attachments: [
                    {
                      filename: "auditreport.pdf",
                      path: __dirname + "/temp/auditreport_" + auditID + ".pdf",
                      contentType: "application/pdf",
                    },
                  ],
                  tls: { rejectUnauthorized: false },
                };
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
      }
    }
  );
}
module.exports = sendReportMail;
