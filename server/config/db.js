const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "habit_tracker",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

module.exports = connection;
