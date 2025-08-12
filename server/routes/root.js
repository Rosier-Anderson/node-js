const path = require("path");
const express = require("express");
const router = express.Router();
const routesPath = /^\/(index\.html?)?$/;
router.get(routesPath, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
