const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const passport = require("passport");
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;

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
  var msg;
  var errMsg = req.flash("error");
  if (errMsg) msg = errMsg;
  res.render("join.ejs", { message: msg });
});

// passport.serialize
passport.serializeUser((user, done) => {
  console.log("passport session save : ", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("passport session get id : ", id);
  done(null, id);
});

passport.use(
  "local-join",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      var body = req.body;
      var name = body.name;
      console.log(name);
      var query = connection.query(
        "select * from user where email=?",
        [email],
        (err, rows) => {
          if (err) return done(err);
          if (rows.length) {
            console.log("already used email");
            return done(null, false, { message: "your email is already used" });
          } else {
            var sql = { name, email, pw: password };
            var query = connection.query(
              "insert into user set ?",
              sql,
              (err, rows) => {
                if (err) throw err;
                return done(null, { email, id: rows.insertId });
              }
            );
          }
        }
      );
    }
  )
);

router.post(
  "/",
  passport.authenticate("local-join", {
    successRedirect: "/main", // 성공 시 /main URL로 이동
    failureRedirect: "/join", // 실패 시 /join URL로 이동
    failureFlash: true,
  })
);

// router.post("/", (req, res) => {
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var password = body.password;

//   var sql = { email, name, pw: password };
//   var query = connection.query(
//     "insert into user set ? ",
//     sql,
//     (err, rows) => {
//       if (err) throw err;
//       else res.render("welcome.ejs", { id: rows.insertId, name: body.name });
//     }
//   );
//   console.log(req.body);
// });

module.exports = router;
