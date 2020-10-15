const mongoose = require("mongoose");

const HomePageProductSchema = mongoose.Schema({
  header: { type: String, required: true },
  images: { type: Array, required: true },
});

const topHomeProductModel = mongoose.model(
  "topHomeProductModel",
  HomePageProductSchema
);

module.exports = {
  topHomeProductModel,
};
