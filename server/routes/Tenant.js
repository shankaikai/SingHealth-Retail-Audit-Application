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
    `SELECT i.*, t.name as tenantName, s.name as staffName
    FROM scratch_issues i
    INNER JOIN scratch_tenants t ON t.id = i.tenantID
    INNER join staff s ON s.id = i.staffID
    WHERE i.id = ${issueID}`,
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(issueID)
        let issueBase = result;
        db.query(
          `SELECT m.*, s.name as staffName, t.name as tenantName FROM messages m
          LEFT JOIN staff s ON s.id = m.staffID
          LEFT JOIN scratch_tenants t ON t.id = m.tenantID
          WHERE m.issueID = ${issueID}`,
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              let issueMessages = result;
              console.log(result)
              res.send({
                issue: issueBase,
                messages: issueMessages,
              })
            }
          }
        )
      }
    }
  );
});

router.post("/issue/reply", (req,res) => {
  let insert = req.body;
  insert.dateSent = new Date(Date.now());
  const messages = []
  messages.push(
    insert.issueID,
    insert.staffID,
    insert.tenantID,
    insert.dateSent,
    insert.reply,
    insert.imageUrl,
  )
  console.log(insert);
  console.log(messages);
  db.query(
    "INSERT INTO messages (issueID, staffID, tenantID, dateSent, body, photoUrl) VALUES (?,?,?,?,?)",
    messages, 
    (err,result) => {
      if(err) {
        console.log(err);
      } else {
        console.log("Inserted Message: " + insert);
        res.send({message: "insert successful"})
      }
    }
  )
})

router.post("/issue/:issueID", (req, res) => {
  const issueID = req.params.issueID;
  console.log(req.body);
  if(req.body.closed){
    db.query(
      `UPDATE scratch_issues SET closed = 1 WHERE id = ${issueID}`,
      (err,result) => {
        if(err){
          console.log(err)
        }
        else{
          console.log("Closed issue " + issueID);
          res.send({message: "update successful"})
        }
      }
    )
  }
});



module.exports = router;
