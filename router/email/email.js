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
router.post("/form", (req, res) => {
  console.log(req.body.email);
  //res.send("welcome" + req.body.email);
  res.render("email.ejs", { email: req.body.email });
});

router.post("/ajax", (req, res) => {
  var email = req.body.email;
  var responseData = {};

  var query = connection.query(
    'select name from user where email="' + email + '"',
    (error, rows) => {
      if (error) throw error;
      if (rows[0]) {
        //console.log(rows[0].name);
        responseData.result = "ok";
        responseData.name = rows[0].name;
      } else {
        responseData.result = "none";
        responseData.name = "";
      }
      res.json(responseData);
    }
  );
});

module.exports = router;
