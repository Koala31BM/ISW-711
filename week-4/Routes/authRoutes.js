const express = require("express");
const router = express.Router();
const { registerUser, generateToken } = require("../controllers/authController");

router.post("/auth/register", registerUser);
router.post("/auth/token", generateToken);

module.exports = router;