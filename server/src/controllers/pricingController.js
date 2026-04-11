const Pricing = require("../models/Pricing");

// GET prices (customer + admin)
exports.getPrices = async (req, res) => {
  try {
    const prices = await Pricing.find();
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE price (admin)
exports.updatePrice = async (req, res) => {
  try {
    const { item, price } = req.body;

    const updated = await Pricing.findOneAndUpdate(
      { item },
      { price },
      { new: true, upsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
