const {
  topHomeProductModel,
} = require("../../Models/HomePage/Slider_and_sliderHeading");

const cloudinary = require("cloudinary").v2;
const Formidable = require("formidable");
const express = require("express");
const Pusher = require("pusher");
const mongoose = require("mongoose");
const { response } = require("express");

//=====================================================Cloudinary config================================================
cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//===================================================Route MiddleWare Constants=========================================
const form = new Formidable.IncomingForm();
const router = express.Router();

//=========================================================PUSHER Setup===============================================
const pusher = new Pusher({
  appId: process.env.pusher_appId,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  useTLS: process.env.pusher_useTLS,
});


//========================================================HomePage Routes===============================================
router.get("/api/home-products", async (request, response) => {
  try {
    await topHomeProductModel
      .find()
      .exec()
      .then((data) => {
        return response.status(200).json(data);
      });
  } catch (error) {
    return response.status(500).json({ msg: "Server is currently down" });
  }
});

router.post("/api/update-home-products/:id", (request, response) => {
  const form = new Formidable.IncomingForm();
  const product_to_remove = request.params.id;

  form.parse(request, (error, fields, files) => {
    const { description, price, ingredients } = fields;
    const { image } = files;

    try {
      cloudinary.uploader.upload(
        image.path,
        { folder: "/ButterScotch(AgreenethOnline)/HomeProducts" },
        async (error, res) => {
          if (error) {
            return response.status(500).json({
              msg:
                "Network error failed to add new home product please try again later or contact support team for assistance",
            });
          }
          const image_url = res.secure_url;

          const newProduct = new topHomeProductModel({
            images: {
              description,
              price,
              ingredients,
              image: image_url,
            },
          });

          const savedProdut = await newProduct.save();

          await topHomeProductModel
            .findOneAndDelete({ _id: product_to_remove })
            .then((results) => {
              return response
                .status(200)
                .json({ msg: "Successfully update home products" });
            })
            .catch((error) => {
              return response.status(200).json({
                msg:
                  "Network error failed to update home product please try again later or contact support team",
              });
            });
        }
      );
    } catch (error) {
      return response.status(500).json({
        msg:
          "Server is currently down please try again later or contact support team",
      });
    }
  });
});

module.exports = router;
