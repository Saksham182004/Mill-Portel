const Order = require("../models/order");

// @desc    Create new order
// @route   POST /api/orders
// @access  Customer
const createOrder = async (req, res) => {
  try {
    const {
      items,
      address,
      note,
      paymentMethod,
      grandTotal,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      customer: req.user.id, // from JWT
      items,
      address,
      note,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      grandTotal,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // only allow valid transitions
    if (!["Processing", "Rejected", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // optional: role check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({
      message: `Order marked as ${status}`,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const markPaymentPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "Paid";

    // Optional business rule
    if (order.orderStatus === "Pending") {
      order.orderStatus = "Processing";
    }

    await order.save();

    res.json({
      message: "Payment marked as paid",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { createOrder, getMyOrders , getAllOrders , updateOrderStatus ,markPaymentPaid};
