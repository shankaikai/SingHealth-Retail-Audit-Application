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

const createMessageArray = (
  issueID, isStaff, dateSent, body, photoUrl) => {

  }

router.post("/issue/reply", (req,res) => {
  let insert = req.body;
  insert.dateSent = new Date(Date.now());
  const messages = []
  messages.push(
    insert.issueID,
    insert.isStaff,
    insert.dateSent,
    insert.reply,
    insert.imageUrl,
  )
  console.log(insert);
  console.log(messages);
  db.query(
    "INSERT INTO messages (issueID, isStaff, dateSent, body, photoUrl) VALUES (?,?,?,?,?)",
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
