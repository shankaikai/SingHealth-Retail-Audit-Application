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
                `SELECT * FROM escdb.scratch_audits WHERE tenantID = ${tenantID} and completed = 0`,
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

module.exports = router;
