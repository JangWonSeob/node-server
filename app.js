const express = require("express"); // express를 express라는 이름으로 사용
const app = express(); // app에서 express를 실행한다.
const bodyParser = require("body-parser"); //body-parser을 bodyParser라는 이름으로 사용
const router = require("./router/index");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const flash = require("connect-flash");

app.listen(3000, () => {
  console.log("start!! express srver on part 3000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(router);
