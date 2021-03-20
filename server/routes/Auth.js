const express = require("express");
const router = express.Router();
//const db = require("../config/DatabaseConfig");
const db = require("../config/SQLiteConfig");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Route protector
const redirectToLogin = (req, res, next) =>  {
  if(!req.session.userID) {
    res.redirect("/"); // to "/" route
  } else {
    next();
  }
}

const INVALID_USERNAME = "INVALID_USERNAME" // check on login && register
const INVALID_PASSWORD = "INVALID_PASSWORD" // check on valid username

const DUPLICATED_USERNAME = "DUPLICATED_USERNAME"
const DATABASE_ERROR = ["QUERY_ERROR", "INSERTION_ERROR"]
const HASH_ERROR = "HASH_ERROR"


router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username)
  console.log(password)
  
  db.all(
    `SELECT * from Staffs where StaffName = ?`,
    [username],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        // Check whether username is in database
        console.log(result)
        if (result.length > 0) {
          bcrypt.compare(password, result[0].StaffPassword, (error, response) => {
            if (response) {
              // Grab the user's id on the db
              const id = result[0].StaffID;

              // Create a session and place the id into it
              req.session.userID = id;

              res.json({ login_status: true, result: id });

              // prompt user to next page

              console.log(`${username} logged in!`);
            } else {
              // Invalid Password
              res.json({  login_status : false, reason : INVALID_PASSWORD });
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
      if(err) {
        reject(err);
      } else {
        resolve(hash);
    }});
  }) 
    
}

const getStaff = (staffName) => {
  return new Promise((resolve, reject) => {
    var query_string = "SELECT * from staffs where StaffName = ?";
    var query_var = [staffName];

    db.all(
      query_string,
      query_var,
      (err, result) => {
        if (err) {
          return reject(err);
        } 
        resolve(result);
      }
    );

  });
    
};

const insertStaff = (staffName, staffPassword) => {
  return new Promise((resolve, reject) => {
    var query_string = "INSERT INTO staffs (StaffName, StaffPassword) VALUES (?,?)";
    var query_var = [staffName, staffPassword];

    db.run(
      query_string,
      query_var,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      }
    );
  }) 
}


// Register POST Request
router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  getStaff(username)
  .then((result) => {
    console.log(result)
    if(result.length == 0) {
      console.log("No staff with StaffName: " + username + " found")
      hashPassword(password)
      .then((hash) => {
        console.log(hash)
        insertStaff(username, hash)
        .then((result) => {
          res.send({register_status : true});
          console.log("Register Success")
          console.log("Row changes " + result)
        })
        .catch((err) => {
          console.log(err)
          res.send({register_status : false, reason : DATABASE_ERROR[1]});
          console.log("Register fail")
        });
      })
      .catch((err) => {
        console.log(err)
        res.send({register_status : false, reason : HASH_ERROR});
      });
    } else {
      res.send({register_status : false, reason : DUPLICATED_USERNAME});
      // prompt user to re-enter username
    }
  })
  .catch((err) => {
    console.log(err)
    res.send({register_status : false, reason : DATABASE_ERROR[0]});
  });
});



router.get("/logout", redirectToLogin, (req, res) => {
  req.session.destroy((err) => {
    if(err) {
      console.log(err);
      return res.send({ logout_status : false });
    } 
    res.clearCookie("SID");
    res.send({ logout_status : true });
    // prompt user to login
  })
});

module.exports = router;
