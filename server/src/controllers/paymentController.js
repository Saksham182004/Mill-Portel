const crypto = require("crypto");
const Order = require("../models/order");
const razorpay = require("../config/razorpay");

// 🔹 CREATE RAZORPAY ORDER
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // 1️⃣ Fetch order from DB
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2️⃣ Only allow online payments
    if (!["UPI", "Bank Transfer"].includes(order.paymentMethod)) {
      return res
        .status(400)
        .json({ message: "Payment method is not online" });
    }

    // 3️⃣ Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.grandTotal * 100, // ₹ → paise
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    // 4️⃣ Save Razorpay orderId in DB
    order.razorpay = {
      orderId: razorpayOrder.id,
    };
    await order.save();

    // 5️⃣ Send details to frontend
    res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// 🔹 VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1️⃣ Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 2️⃣ Find order using razorpay orderId
    const order = await Order.findOne({
      "razorpay.orderId": razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 3️⃣ Update order payment status
    order.paymentStatus = "Paid";
    order.razorpay.paymentId = razorpay_payment_id;
    order.razorpay.signature = razorpay_signature;

    await order.save();

    res.json({ message: "Payment verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
