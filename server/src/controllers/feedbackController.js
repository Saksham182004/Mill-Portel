const Feedback = require("../models/Feedback");
const Order = require("../models/order");

// POST /api/feedback
exports.createFeedback = async (req, res) => {
  try {
    const { orderId, rating, comment } = req.body;

    // ✅ rating is mandatory, orderId is NOT
    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }

    let order = null;

    // ✅ If orderId is provided, validate it
    if (orderId) {
      // check order belongs to user
      order = await Order.findOne({
        _id: orderId,
        customer: req.user.id,
      });

      if (!order) {
        return res.status(403).json({ message: "Not your order" });
      }

      // prevent duplicate feedback for same order
      const exists = await Feedback.findOne({
        order: orderId,
        customer: req.user.id,
      });

      if (exists) {
        return res
          .status(400)
          .json({ message: "Feedback already submitted for this order" });
      }
    }

    // ✅ Create feedback (order only if provided)
    const feedback = await Feedback.create({
      customer: req.user.id,
      rating,
      comment,
      order: orderId || null,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/feedback (admin)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("customer", "name email")
      .populate("order", "grandTotal")
      .sort({ createdAt: -1 });

    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
