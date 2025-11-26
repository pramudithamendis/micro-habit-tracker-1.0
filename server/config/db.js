const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "habit_tracker",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
