const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

// Correct usage
router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
