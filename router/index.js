const express = require("express");
const router = express.Router();
const home = require("./home/home");
const main = require("./main/main");
const email = require("./email/email");
const join = require("./join/join");

router.use(home);
router.use("/main", main);
router.use("/email", email);
router.use("/join", join);

module.exports = router;
