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
  res.render("login.ejs", { message: msg });
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
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log(1);
      var body = req.body;
      var name = body.name;
      var query = connection.query(
        "select * from user where email=?",
        [email],
        (err, rows) => {
          if (err) return done(err);
          if (rows.length) {
            console.log("id : ", rows[0].no, "rows : ", rows);
            return done(null, { email: email, id: rows[0].no });
          } else {
            return done(null, false, { message: "your email not found..." });
          }
        }
      );
    }
  )
);

router.post("/", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) res.status(500).json(err);
    if (!user) {
      return res.status(401).json(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
