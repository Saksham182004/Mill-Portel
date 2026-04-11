const express = require("express");
const router = express.Router();

const { createOrder ,getMyOrders ,getAllOrders , updateOrderStatus, markPaymentPaid} = require("../controllers/orderController");
const { protect  } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");


console.log("DEBUG protect:", protect);
console.log("DEBUG createOrder:", createOrder);

// Customer places order
router.post("/", protect, createOrder);
router.get("/", protect, isAdmin, getAllOrders);
router.get("/my", protect, getMyOrders);
router.put("/:id/status", protect, updateOrderStatus);
router.put("/:id/pay", protect, markPaymentPaid);

module.exports = router;
