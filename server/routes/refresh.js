const express = require("express");
const router = express.Router();
const refreshController = require("../controllers/refreshTokenController");
router.post("/", refreshController.handleLogin);
module.exports = router;
