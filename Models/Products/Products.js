const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  image: { type: String, required: true },
  price:{type:Number, required:true}
});

const productModel = mongoose.model("products", productSchema);

module.exports = { productModel };
