const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sendMail = require("../helpers/emails/EmailerPrompt");

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
          `SELECT * from scratch_issues WHERE tenantID = ${tenantID} AND closed = 0`,
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
    `SELECT id, name, email, type, location, cluster, imageUrl FROM scratch_tenants WHERE id = ${tenantID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

router.post("/edit/:tenantID", (req, res) => {
  const tenantID = req.params.tenantID;
  console.log("updating tenant id " + tenantID);
  const name = req.body.name;
  const cluster = req.body.cluster;
  const type = req.body.type;
  const location = req.body.location;
  const email = req.body.email;
  const imageUrl = req.body.imageUrl;
  const password = req.body.password;
  if (password === "" || password === null || password === undefined) {
    db.query(
      "UPDATE scratch_tenants SET name = ?, cluster = ?, location = ?, imageUrl = ?, type = ?, email = ? WHERE id = ?",
      [name, cluster, location, imageUrl, type, email, tenantID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("update completed");
          res.send({ message: "update success" });
        }
      }
    );
  } else {
    hashPassword(password).then((hash) => {
      "UPDATE scratch_tenants SET name = ?, cluster = ?, location = ?, imageUrl = ?, type = ?, email = ?, password = ? WHERE id = ?",
        [name, cluster, location, imageUrl, type, email, hash, tenantID],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("update completed");
            res.send({ message: "update success" });
          }
        };
    });
  }
});

router.get("/issue/:issueID", (req, res) => {
  const issueID = req.params.issueID;
  db.query(
    `SELECT i.*, t.name as tenantName, s.name as staffName
    FROM scratch_issues i
    LEFT JOIN scratch_tenants t ON t.id = i.tenantID
    LEFT join staff s ON s.id = i.staffID
    WHERE i.id = ${issueID}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(issueID);
        let issueBase = result;
        db.query(
          `SELECT m.*, s.name as staffName, t.name as tenantName FROM messages m
          LEFT JOIN staff s ON s.id = m.staffID
          LEFT JOIN scratch_tenants t ON t.id = m.tenantID
          WHERE m.issueID = ${issueID} ORDER BY dateSent`,
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              let issueMessages = result;
              console.log(result);
              res.send({
                issue: issueBase,
                messages: issueMessages,
              });
            }
          }
        );
      }
    }
  );
});

router.post("/issue/reply", (req, res) => {
  let insert = req.body;
  insert.dateSent = new Date(Date.now());
  const messages = [];
  messages.push(
    insert.issueID,
    insert.staffID,
    insert.tenantID,
    insert.dateSent,
    insert.reply,
    insert.imageUrl
  );
  console.log(insert);
  console.log(messages);
  db.query(
    "INSERT INTO messages (issueID, staffID, tenantID, dateSent, body, photoUrl) VALUES (?,?,?,?,?,?)",
    messages,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Inserted Message: " + insert);
        res.send({ message: "insert successful" });
      }
    }
  );
});

router.post("/issue/:issueID", (req, res) => {
  const issueID = req.params.issueID;
  console.log(req.body);
  if (req.body.closed) {
    db.query(
      `UPDATE scratch_issues SET closed = 1 WHERE id = ${issueID}`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Closed issue " + issueID);
          res.send({ message: "update successful" });
        }
      }
    );
  }
});

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

router.post("/create", (req, res) => {
  console.log("creating new tenant");
  const name = req.body.name;
  const cluster = req.body.cluster;
  const type = req.body.type;
  const location = req.body.location;
  const email = req.body.email;
  const password = req.body.password;
  const imageUrl = req.body.imageUrl;
  hashPassword(password).then((hash) => {
    db.query(
      "INSERT INTO scratch_tenants (cluster, name, location, imageUrl, usertype, type, password, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [cluster, name, location, imageUrl, "tenant", type, hash, email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(name + " tenant created successfuly!");
          res.send({ message: "Tenant registration success!" });
        }
      }
    );
  });
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log("deleting tenant id " + id + "...");
  db.query("DELETE from scratch_tenants WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ message: "Delete success" });
      console.log(" deleted tenant id " + id);
    }
  });
});

router.post("/issue/prompt/:id", (req, res) => {
  const id = req.params.id;
  console.log("prompting issue id " + id + "...");
  db.query(
    `SELECT * FROM escdb.scratch_tenants t JOIN escdb.scratch_issues i ON i.tenantID = t.id WHERE i.id = ${id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "prompt success" });
        // var email = result[0].email;
        var email = "ongkahyuan@gmail.com";
        sendMail("hotmail", email, result);
        console.log(result);
      }
    }
  );
});
module.exports = router;
