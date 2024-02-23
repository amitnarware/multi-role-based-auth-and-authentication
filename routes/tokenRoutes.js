const express = require("express");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.post("/refresh", tokenController.refreshToken);

module.exports = router;
