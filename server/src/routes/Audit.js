const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");

router.get("/:auditID", (req, res) => {
  let audits;
  let issues;
  const auditID = req.params.auditID;

  db.query(
    `SELECT * from scratch_audits WHERE id = ${auditID}`,
    [audits],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        audits = result;
        db.query(
          `SELECT * from scratch_issues WHERE auditID = ${auditID}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              issues = result;
              res.send({
                ...audits[0],
                issues: issues,
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
