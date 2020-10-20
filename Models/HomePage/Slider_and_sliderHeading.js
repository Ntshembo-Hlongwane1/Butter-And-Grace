const mongoose = require("mongoose");

const HomePageProductSchema = mongoose.Schema({
  images: { type: Array, required: true },
});

const topHomeProductModel = mongoose.model(
  "topHomeProductModel",
  HomePageProductSchema
);

module.exports = {
  topHomeProductModel,
};
