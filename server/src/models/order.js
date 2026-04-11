const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  pricePerKg: {
    type: Number,
    required: true,
  },
  itemTotal: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    // 🔗 CUSTOMER WHO PLACED ORDER
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🛒 ITEMS
    items: {
      type: [orderItemSchema],
      required: true,
    },

    // 📍 DELIVERY ADDRESS
    address: {
      type: String,
      required: true,
    },

    // 📝 OPTIONAL NOTE
    note: {
      type: String,
    },

    // 💰 TOTAL AMOUNT
    grandTotal: {
      type: Number,
      required: true,
    },

    // 💳 PAYMENT
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Bank Transfer"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },


    razorpay: {
      orderId: {
        type: String, // Razorpay order_id
      },
      paymentId: {
        type: String, // Razorpay payment_id
      },
      signature: {
        type: String, // Razorpay signature
      },
    },

    // 📦 ORDER STATUS (ADMIN CONTROL)
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

module.exports = mongoose.model("Order", orderSchema);
