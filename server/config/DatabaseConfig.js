const mysql = require("mysql");
require("dotenv/config");
const db = mysql.createConnection({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  ssl: true
});

module.exports = db;
