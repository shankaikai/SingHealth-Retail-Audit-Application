const mysql = require("mysql");
require("dotenv/config");
console.log(process.env.DATABASE_USER)
const db = mysql.createConnection({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

module.exports = db;
