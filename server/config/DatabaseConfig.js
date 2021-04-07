const mysql = require("mysql");
require("dotenv/config");
const db = mysql.createPool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  ssl: true,
  multipleStatements: true
});

module.exports = db;
