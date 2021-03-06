const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  var id = req.user;
  if (!id) res.render("login.ejs");
  res.render("main.ejs", { id: id });
});

module.exports = router;
