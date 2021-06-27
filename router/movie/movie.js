const express = require("express");
const router = express.Router();
const mysql = require("mysql");

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
router.get("/list", (req, res) => {
  res.render("movie.ejs");
});

// 1. /movie , GET
router.get("/", (req, res) => {
  var responseData = {};

  var query = connection.query("select title from movie", (err, rows) => {
    if (err) throw err;
    if (rows[0]) {
      console.log(rows);
      responseData.result = 1;
      responseData.data = rows;
    } else {
      responseData.result = 0;
      responseData.data = "";
    }
    res.json(responseData);
  });
});

router.post("/", (req, res) => {
  let body = req.body;
  let title = body.title;
  let type = body.type;
  let grade = body.grade;
  let actor = body.actor;

  var sql = { title, type, grade, actor };
  var query = connection.query("insert into movie set ? ", sql, (err, rows) => {
    if (err) throw err;
    else res.json({ result: 1 });
  });
});

// router.post("/ajax", (req, res) => {
//   var email = req.body.email;
//   var responseData = {};

//   var query = connection.query(
//     'select name from user where email="' + email + '"',
//     (err, rows) => {
//       if (err) throw err;
//       if (rows[0]) {
//         //console.log(rows[0].name);
//         responseData.result = "ok";
//         responseData.name = rows[0].name;
//       } else {
//         responseData.result = "none";
//         responseData.name = "";
//       }
//       res.json(responseData);
//     }
//   );
// });

module.exports = router;
