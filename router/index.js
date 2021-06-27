const express = require("express");
const router = express.Router();
const home = require("./home/home");
const main = require("./main/main");
const email = require("./email/email");
const join = require("./join/join");
const login = require("./login/login");
const logout = require("./logout/logout");

router.use(home);
router.use("/main", main);
router.use("/email", email);
router.use("/join", join);
router.use("/login", login);
router.use("/logout", logout);

module.exports = router;
