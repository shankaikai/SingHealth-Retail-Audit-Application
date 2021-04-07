const express = require("express");
const router = express.Router();

// Middleware for this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Routes

module.exports = router;
