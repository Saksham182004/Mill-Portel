const express = require("express");
const router = express.Router();

const {
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const { protect } = require("../middleware/authMiddleware");


// 🔹 Create Razorpay order (UPI only)
router.post("/create-order", protect, createRazorpayOrder);

// 🔹 Verify payment
router.post("/verify", protect, verifyPayment);

module.exports = router;
