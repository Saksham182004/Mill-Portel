const express = require("express");
const {registerUser, loginUser} = require("../controllers/authController.js");
const limiter = require("../middleware/rateLimiter.js")
const router = express.Router();

router.post("/register",limiter,registerUser);
router.post("/login",limiter, loginUser);


module.exports =router;


