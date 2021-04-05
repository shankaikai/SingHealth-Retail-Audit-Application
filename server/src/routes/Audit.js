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

// Helper function to create array of issues
const createIssuesArray = (
  issues,
  tenantID,
  auditID,
  staffID,
  dateCompleted
) => {
  out = [];
  for (let i = 0; i < issues.length; i++) {
    var issue = issues[i];
    out.push([
      tenantID,
      auditID,
      staffID,
      dateCompleted,
      issue.location,
      0,
      issue.issueName,
      issue.description,
      issue.imageUrl,
    ]);
  }
  return out;
};

// POST req for new audits
router.post("/complete", (req, res) => {
  console.log(req.body);
  const tenantID = req.body.tenantID;
  const staffID = req.body.staffID;
  const completed = req.body.completed;
  const dateStarted = req.body.dateStarted;
  const data = req.body.data;
  const dateCompleted = req.body.dateCompleted;
  const scores = req.body.scores;
  const score = req.body.score;
  let auditID;
  db.query(
    "INSERT INTO scratch_audits (tenantID, staffID, completed, dateStarted, data, dateCompleted, scores, score) VALUES (?,?,?,?,?,?,?,?); SELECT LAST_INSERT_ID();",
    [
      tenantID,
      staffID,
      completed,
      dateStarted,
      JSON.stringify(data),
      dateCompleted,
      JSON.stringify(scores),
      score,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        auditID = result[1][0]["LAST_INSERT_ID()"];
        console.log("insert audit success with audit id: " + auditID);
        // Insert issues
        const issues = createIssuesArray(
          req.body.issues,
          tenantID,
          auditID,
          staffID,
          dateCompleted
        );
        db.query(
          "INSERT INTO scratch_issues (tenantID, auditID, staffID, date, location, closed, title, description, imageUrl) VALUES ?",
          [issues],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                result.affectedRows +
                  " issues inserted for audit ID: " +
                  auditID
              );
            }
          }
        );
      }
    }
  );
});

module.exports = router;
