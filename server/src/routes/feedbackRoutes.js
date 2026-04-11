const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createFeedback, getAllFeedback } = require("../controllers/feedbackController");

const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// Customer submits feedback
router.post("/", protect, createFeedback);

// Admin views all feedback
router.get("/", protect,isAdmin, getAllFeedback);

module.exports = router;
