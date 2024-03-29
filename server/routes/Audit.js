const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");
const sendMail = require("../helpers/emails/EmailerPDF");

// GET for viewing audit detailss!
router.get("/:auditID", (req, res) => {
  let audits;
  let issues;
  const auditID = req.params.auditID;

  db.query(
    `SELECT * from scratch_audits WHERE id = ${auditID}`,
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

// GET for ongoing audits
router.get("/ongoing/:id", (req, res) => {
  console.log("ongoing endpoint called");
  const auditID = req.params.id;
  db.query(
    "SELECT * FROM scratch_audits WHERE id = ?",
    [auditID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Ongoing audit id " + auditID + " sent!");
        res.send(result[0]);
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
  if (issues.length === 0) {
    return null;
  }
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
      issue.deadline,
    ]);
  }
  return out;
};

// POST req for new audits
router.post("/newcomplete", (req, res) => {
  console.log("new complete endpoint called");
  const tenantID = req.body.tenantID;
  const staffID = req.body.staffID;
  const dateStarted = req.body.dateStarted;
  console.log(dateStarted);
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
      1,
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
          new Date(Date.now()).toISOString()
        );
        db.query(
          "UPDATE scratch_tenants SET onGoingAuditID = ? WHERE id = ?",
          [null, score, tenantID],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "tenant " +
                  tenantID +
                  " has been updated with onGoingAuditID " +
                  auditID
              );
              if (issues) {
                db.query(
                  "INSERT INTO scratch_issues (tenantID, auditID, staffID, date, location, closed, title, description, imageUrl, deadline) VALUES ?",
                  [issues],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(
                        issues.length +
                          " issues inserted for audit ID: " +
                          auditID
                      );
                      res.send({
                        message: "Upload of complete audit success!",
                        auditID: auditID,
                      });
                    }
                  }
                );
              } else {
                res.send({
                  message: "Upload of complete audit success!",
                  auditID: auditID,
                });
              }
            }
          }
        );
      }
    }
  );
});

// POST req for new to partial audits
router.post("/newpartial", (req, res) => {
  console.log("new to partial endpoint called");
  const tenantID = req.body.tenantID;
  const staffID = req.body.staffID;
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
      0,
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
          new Date(Date.now()).toISOString()
        );
        // console.log(issues);
        db.query(
          `UPDATE scratch_tenants SET onGoingAuditID = ${auditID} WHERE id = ${tenantID}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "tenant " +
                  tenantID +
                  " has been updated with onGoingAuditID " +
                  auditID
              );
              if (issues) {
                db.query(
                  "INSERT INTO scratch_issues (tenantID, auditID, staffID, date, location, closed, title, description, imageUrl, deadline) VALUES ?",
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

                    res.send({
                      message: "Upload of partial audit success!",
                      auditID: auditID,
                    });
                  }
                );
              } else {
                res.send({
                  message: "Upload of partial audit success!",
                  auditID: auditID,
                });
              }
            }
          }
        );
      }
    }
  );
});

// POST req for partial to partial audits
router.post("/partial", (req, res) => {
  console.log("partial to partial endpoint called");
  const data = JSON.stringify(req.body.data);
  const scores = JSON.stringify(req.body.scores);
  const score = req.body.score;
  const auditID = req.body.auditID;
  const staffID = req.body.staffID;
  const tenantID = req.body.tenantID;
  db.query(
    `UPDATE scratch_audits SET scores = ?, score = ?, data = ? WHERE id = ?`,
    [scores, score, data, auditID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update audit success with audit id: " + auditID);
        // Insert issues
        const issues = createIssuesArray(
          req.body.issues,
          tenantID,
          auditID,
          staffID,
          new Date(Date.now()).toISOString()
        );

        if (issues) {
          db.query(
            "INSERT INTO scratch_issues (tenantID, auditID, staffID, date, location, closed, title, description, imageUrl, deadline) VALUES ?",
            [issues],
            (err, result) => {
              console.log(
                result.affectedRows +
                  " issues inserted for audit ID: " +
                  auditID
              );
              res.send({
                message: "Update of partial audit success!",
                auditID: auditID,
              });
            }
          );
        } else {
          res.send({
            message: "Update of partial audit success!",
            auditID: auditID,
          });
        }
      }
    }
  );
});

// POST req for partial to complete
router.post("/partialcomplete", (req, res) => {
  console.log("partial to complete endpoint called");
  const data = JSON.stringify(req.body.data);
  const scores = JSON.stringify(req.body.scores);
  const score = req.body.score;
  const auditID = req.body.auditID;
  const staffID = req.body.staffID;
  const tenantID = req.body.tenantID;
  const dateCompleted = req.body.dateCompleted;
  db.query(
    "UPDATE scratch_audits SET scores = ?, score = ?, data = ?, dateCompleted = ?, completed = 1 WHERE id = ?",
    [scores, score, data, dateCompleted, auditID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("update audit success with audit id: " + auditID);
        // Insert issues
        const issues = createIssuesArray(
          req.body.issues,
          tenantID,
          auditID,
          staffID,
          new Date(Date.now()).toISOString()
        );
        db.query(
          "UPDATE scratch_tenants SET onGoingAuditID = ? WHERE id = ?",
          [null, parseInt(tenantID)],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "Tenant id " + tenantID + "'s onGoingAuditID set to null"
              );
              if (issues) {
                db.query(
                  "INSERT INTO scratch_issues (tenantID, auditID, staffID, date, location, closed, title, description, imageUrl, deadline) VALUES ?",
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

                    res.send({
                      message: "Update of complete audit success!",
                      auditID: auditID,
                    });
                  }
                );
              } else {
                res.send({
                  message: "Update of complete audit success!",
                  auditID: auditID,
                });
              }
            }
          }
        );
      }
    }
  );
});

// GET req for export audit summary
router.get("/export/:auditID/:email", (req, res) => {
  const auditID = req.params.auditID;
  const toSend = req.params.email;
  console.log("Sending report to " + toSend);
  let audits;
  db.query(
    `SELECT a.id as auditID, a.dateStarted, a.dateCompleted, a.scores, a.score, c.cluster, b.name as auditor, c.name as tenant, c.location, c.type 
    from scratch_audits a
    LEFT JOIN staff b ON a.staffID = b.id 
    LEFT JOIN scratch_tenants c ON a.tenantID = c.id
    WHERE a.id = ${auditID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        audits = result[0];
        db.query(
          `SELECT * from scratch_issues WHERE auditID = ${auditID}`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              issues = result;
              // Generate pdf from the data
              const scores = JSON.parse(audits.scores);
              sendMail(
                "hotmail",
                toSend,
                {
                  scores: scores,
                  audit: audits,
                  issues: issues,
                },
                auditID
              );
              res.send({ message: "email sent" });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
