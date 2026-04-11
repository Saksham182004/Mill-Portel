const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getPrices, updatePrice } = require("../controllers/pricingController");

const isAdmin = require("../middleware/isAdmin");


//Customer 
router.get("/", protect, getPrices);

//admin
router.put("/", protect,isAdmin, updatePrice);

module.exports = router;