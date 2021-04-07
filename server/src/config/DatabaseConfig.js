const mysql = require("mysql");
require("dotenv/config");

const db = mysql.createPool({
  user: process.env.SERVER_USER,
  host: process.env.SERVER_HOST,
  password: process.env.SERVER_PASSWORD,
  database: process.env.SERVER_DATABASE,
  port: process.env.SERVER_PORT,
  ssl: true,
  multipleStatements: true,
});

module.exports = db;
