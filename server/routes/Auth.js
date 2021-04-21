const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");
//const db = require("../config/SQLiteConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const sendMail = require("../helpers/emails/Emailer").sendMailResetPassword;

// Route protector
const redirectToLogin = (req, res, next) => {
  if (!req.session.userID) {
    res.redirect("/"); // to "/" route
  } else {
    next();
  }
};

// GET for edit staff profile
router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * from staff WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0]);
    }
  });
});

// POST for updating staff profile
router.post("/edit/:id", (req, res) => {
  console.log("editing staff");
  console.log(req.body);
  const id = req.params.id;
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const cluster = req.body.cluster;
  const imageUrl = req.body.imageUrl;
  if (password === undefined || password === "" || password === null) {
    db.query(
      "UPDATE staff SET email = ?, name = ?, cluster = ?, imageUrl = ? WHERE id = ?",
      [email, name, cluster, imageUrl, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send({ message: "Update success!" });
        }
      }
    );
  } else {
    hashPassword(password).then((hash) => {
      db.query(
        "UPDATE staff SET email = ?, password = ?, name = ?, cluster = ?, imageUrl = ? WHERE id = ?",
        [email, hash, name, cluster, imageUrl, id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ message: "Update success!" });
          }
        }
      );
    });
  }
});

router.get("/login", (req, res) => {
  console.log(req.session);
  if (req.session.userID) {
    var user = {
      id: req.session.userID,
      name: req.session.userName,
      type: req.session.userType,
      imageUrl: req.session.imageUrl,
    };
    res.send({ login_status: true, user });
  } else {
    res.send({ login_status: false });
  }
});

const INVALID_USERNAME = "INVALID_EMAIL"; // check on login && register
const INVALID_PASSWORD = "INVALID_PASSWORD"; // check on valid username

const DUPLICATED_USERNAME = "DUPLICATED_EMAIL";
const DATABASE_ERROR = ["QUERY_ERROR", "INSERTION_ERROR"];
const HASH_ERROR = "HASH_ERROR";

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email + " is attempting to log in...");
  db.query(
    `SELECT * FROM (SELECT id, name, email, usertype, password, imageUrl FROM escdb.scratch_tenants
    UNION
    SELECT id, name, email, usertype, password, imageUrl FROM escdb.staff) AS x WHERE email = ?`,
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // Check whether email is in database
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              // Grab the user's id on the db
              const id = result[0].id;
              const name = result[0].name;
              const usertype = result[0].usertype;
              const imageUrl = result[0].imageUrl;

              // Create a session and place the id into it
              req.session.userID = id;
              req.session.userName = name;
              req.session.userType = usertype;
              req.session.imageUrl = imageUrl;
              // console.log(req.session);
              // req.session.save();

              res.send({
                login_status: true,
                id: id,
                name: name,
                type: usertype,
                imageUrl: imageUrl,
              });

              // prompt user to next page

              console.log(`${email} logged in!`);
            } else {
              // Invalid Password
              res.json({ login_status: false, reason: INVALID_PASSWORD });
              // prompt user to re-enter the password
            }
          });
        } else {
          res.json({ login_status: false, reason: INVALID_USERNAME });
          // prompt user to register
        }
      }
    }
  );
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

const getStaffName = (email) => {
  return new Promise((resolve, reject) => {
    var query_string = "SELECT name from staff where email = ?";
    var query_var = [email];

    db.query(query_string, query_var, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getStaff = (email) => {
  return new Promise((resolve, reject) => {
    var query_string = "SELECT * from staff where email = ?";
    var query_var = [email];

    db.query(query_string, query_var, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Function to insert new staff into db
const insertStaff = (password, cluster, email, name, imageUrl) => {
  return new Promise((resolve, reject) => {
    var query_string =
      "INSERT INTO staff (password, cluster, email, name, usertype, imageUrl) VALUES (?,?,?,?,?,?)";
    var query_var = [password, cluster, email, name, "staff", imageUrl];

    db.query(query_string, query_var, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

const updatePassword = (email, password) => {
  
  return new Promise((resolve, reject) => {
    var query_string = `UPDATE staff SET password = ? WHERE email = ?`;
    var query_var = [password, email]
    db.query(query_string, query_var, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    })
  })
}

// Register POST Request
router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const cluster = req.body.cluster;
  const imageUrl = req.body.imageUrl;

  getStaff(email)
    .then((result) => {
      console.log(result);
      console.log(result.length);
      if (result.length === 0) {
        console.log("No staff with email: " + email + " found");
        hashPassword(password)
          .then((hash) => {
            console.log(hash);
            insertStaff(hash, cluster, email, name, imageUrl)
              .then((result) => {
                res.send({ register_status: true });
                console.log("Register Success");
                //console.log("Row changes " + result)
              })
              .catch((err) => {
                console.log(err);
                res.send({ register_status: false, reason: DATABASE_ERROR[1] });
                console.log("Register fail");
              });
          })
          .catch((err) => {
            console.log(err);
            res.send({ register_status: false, reason: HASH_ERROR });
          });
      } else {
        res.send({ register_status: false, reason: DUPLICATED_USERNAME });
        // prompt user to re-enter username
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ register_status: false, reason: DATABASE_ERROR[0] });
    });
});

router.post("/sendemailresetpassword", (req, res) => {
  const email = req.body.email;
  // TODO: Extract service from email
  const service = "hotmail";
  getStaff(email)
  .then((data) => {
    if(data.length == 1) {
      getStaffName(email)
      .then((result) => {
        var name = result[0].name;
        sendMail(service, email, name);
        res.send({resetpassword_status : true})
      })
      .catch((err) => {
        console.log(err);
      });
    } else if(data.length == 0) {
      res.send({resetpassword_status : false})
    }
  })
  .catch((err) => {console.log(err)})
  
});

router.post("/resetpassword", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(`Request to reset password for email ${email}, password ${password}`)
  hashPassword(password)
  .then((hash) => {
    updatePassword(email, hash)
    .then(() => {console.log(`password for ${email} updated`)})
    .catch((err) => {console.log(err)})
  })
  .catch((err) => {console.log(err)})
})

router.post("/logout", (req, res) => {
  console.log("user attemping to log out");
  // req.session.destroy();
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ login_status: false });
    }
  });
  // res.end();
  // res.send({ login_status: false });
});

module.exports = router;
