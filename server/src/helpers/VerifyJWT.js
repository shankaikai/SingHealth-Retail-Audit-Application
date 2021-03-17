const jwt = require("jsonwebtoken");

// verifyJWT is a middleware to check if the user has a valid token
const verifyJWT = (req, res, next) => {
  // grabbing the token
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("We need a token");
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "You failed to authenticate" });
      } else {
        // Save the decoded id into the variable userId
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = verifyJWT;
