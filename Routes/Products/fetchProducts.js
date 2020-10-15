const router = require("express").Router();
const { productModel } = require("../../Models/Products/Products");

//========================================================PRODUCT FETCH ROUTE===========================================
router.get("/api/all-products", async (request, response) => {
  try {
    await productModel
      .find()
      .exec()
      .then((data) => {
        return response.status(200).json(data);
      });
  } catch (error) {
    return response.status(500).json({ msg: "Server is currently down :(" });
  }
});

router.get("/api/product-detail/:id", async (request, response) => {
  try {
    await productModel
      .findOne({ _id: request.params.id })
      .exec()
      .then((data) => {
        return response.status(200).json(data);
      });
  } catch (error) {
    return response.status(500).json({ msg: "Server is currently down" });
  }
});

module.exports = router;
