const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  owner: { type: String, required: true },
  cart: { type: String, required: true },
});

const cartModel = mongoose.model("cart", cartSchema);

module.exports = { cartModel };
