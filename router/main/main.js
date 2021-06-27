const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  var id = req.user;
  console.log("main js loaded", id);
  //res.sendFile(path.join(__dirname + "/../../public/main.html"));
  res.render("main.ejs", { id: id });
});

module.exports = router;
