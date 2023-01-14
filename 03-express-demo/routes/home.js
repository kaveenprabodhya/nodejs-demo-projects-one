const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // sending html template in response
  res.render("index", { title: "ExpressJs", message: "Hello World" });
});

module.exports = router;
