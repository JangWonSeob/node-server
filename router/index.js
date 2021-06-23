const express = require("express");
const router = express.Router();
const home = require("./home/home");
const main = require("./main/main");
const email = require("./email/email");

router.use(home);
router.use("/main", main);
router.use("/email", email);

module.exports = router;
