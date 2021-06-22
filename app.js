const express = require("express"); // express를 express라는 이름으로 사용
const app = express(); // app에서 express를 실행한다.
const bodyParser = require("body-parser"); //body-parser을 bodyParser라는 이름으로 사용
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mysql1",
  database: "express_server",
});

connection.connect();

app.listen(3000, () => {
  console.log("start!! express srver on part 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //res.send("<h1>hi friend!</h1>");
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.post("/email_post", (req, res) => {
  console.log(req.body.email);
  //res.send("welcome" + req.body.email);
  res.render("email.ejs", { email: req.body.email });
});

app.post("/ajax_send_email", (req, res) => {
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
