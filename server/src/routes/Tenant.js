const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");

router.get("/:tenantID", (req, res) => {
  let details;
  let issues;
  let audits;
  const tenantID = req.params.tenantID;
  db.query(
    `SELECT * from scratch_tenants WHERE id = ${tenantID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        details = result;
        db.query(
          `SELECT * from scratch_issues WHERE tenantID = ${tenantID}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              issues = result;
              db.query(
                `SELECT * FROM escdb.scratch_audits WHERE tenantID = ${tenantID} and completed = 1`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    audits = result;
                    res.send({
                      ...details[0],
                      issues: issues,
                      audits: audits,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

router.get("/edit/:tenantID", (req, res) => {
  const tenantID = req.params.tenantID;
  db.query(
    `SELECT * FROM scratch_tenants WHERE id = ${tenantID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/issue/:issueID", (req, res) => {
  const issueID = req.params.issueID;
  db.query(
    `SELECT * FROM scratch_issues WHERE id = ${issueID}`,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        let issueBase = result;
        let tenantID = ""+ issueBase[0].tenantID;
        let staffID = ""+issueBase[0].staffID;
        db.query(
          `SELECT * FROM messages WHERE issueID = ${issueID}`,
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              let issueMessages = result;
              db.query(
                `SELECT * FROM scratch_tenants WHERE id = ${tenantID}`,
                (err, result) => {
                  if (err) {
                    console.log(err)
                  } else {
                    let tenantName = result[0].name;
                    db.query(
                      `SELECT * FROM staff WHERE id = ${staffID}`,
                      (err, result) => {
                        if (err) {
                          console.log(err)
                        } else {
                          let staffName = result[0].name;
                          console.log(result)
                          res.send({
                            issue: issueBase,
                            messages: issueMessages,
                            tenant: tenantName,
                            staff: staffName,
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        )
      }
    }
  );
});

router.post("/issue/reply", (req, res) => {
  console.log(req.body)
});

module.exports = router;
