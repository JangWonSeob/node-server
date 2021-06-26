const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const path = require("path");
const { runInNewContext } = require("vm");

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

  var sql = { email, name, pw: password };
  var query = connection.query(
    "insert into user  set ? ",
    sql,
    (error, rows) => {
      if (error) throw error;
      else res.render("welcome.ejs", { id: rows.insertId, name: body.name });
    }
  );
  console.log(req.body);
});

module.exports = router;
