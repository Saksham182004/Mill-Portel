const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      unique: true, // Rice, Wheat, Flour
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      default: "per kg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pricing", pricingSchema);
