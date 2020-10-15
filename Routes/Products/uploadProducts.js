const router = require("express").Router();
const { productModel } = require("../../Models/Products/Products");
const FOrmidbale = require("formidable");
const cloudinary = require("cloudinary").v2;

//=========================================================CLOUDINARY CONFIGS===========================================
cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//======================================================ROUTE FOR ADDING NEW PRODUCTS===================================
router.post("/api/add-new-product", (request, response) => {
  const form = new FOrmidbale.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { description, ingredients } = fields;
    const { image } = files;

    try {
      cloudinary.uploader.upload(
        image.path,
        { folder: "/ButterScotch(AgreenethOnline)/Products" },
        async (error, res) => {
          const image_url = res.secure_url;

          const newProduct = new productModel({
            description,
            ingredients,
            image: image_url,
          });

          const savedProduct = await newProduct.save();

          return response
            .status(201)
            .json({ msg: "Product Successfully Added" });
        }
      );
    } catch (error) {
      return response.status(500).json({ msg: "Server is currenty down :(" });
    }
  });
});

module.exports = router;
