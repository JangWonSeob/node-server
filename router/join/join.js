const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const path = require("path");

// Database Setting
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "express_server",
});

connection.connect();

// Router
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../public/join.html"));
});

router.post("/", (req, res) => {
  var body = req.body;
  var email = body.email;
  var name = body.name;
  var password = body.password;

  var query = connection.query(
    'insert into user (name,email,pw) value ("' +
      name +
      '","' +
      email +
      '","' +
      password +
      '")',
    (error, rows) => {
      if (error) throw error;
      console.log("ok db insert");
    }
  );
});

module.exports = router;
