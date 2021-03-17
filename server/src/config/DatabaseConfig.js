const mysql = require("mysql");
require("dotenv/config");

const db = mysql.createConnection({
  user: process.env.SERVER_USER,
  host: process.env.SERVER_HOST,
  password: process.env.SERVER_PASSWORD,
  database: process.env.SERVER_DATABASE,
});

module.exports = db;
