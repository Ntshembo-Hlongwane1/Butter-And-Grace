const {
  topHomeProductModel,
} = require("../../Models/HomePage/Slider_and_sliderHeading");

const cloudinary = require("cloudinary").v2;
const Formidable = require("formidable");
const express = require("express");
const Pusher = require("pusher");
const mongoose = require("mongoose");

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

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database is open");

  const homepageContent = db.collection("tophomeproductmodels");
  const changeStream = homepageContent.watch();

  changeStream.on("change", (change) => {
    const { images, header } = change.updateDescription.updatedFields;
    console.log(change);
    if (change.operationType === "update") {
      const homeContent = images;
      pusher.trigger("homeContent", "updated", {
        images: images ? images : null,
        header: header ? header : null,
      });
    } else {
      console.log("Error in pusher trigger");
    }
  });
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

router.post("/api/home-sliders-top", (request, response) => {
  form.parse(request, async (error, fields, files) => {
    const { indexToChange, headerText } = fields;
    const { image } = files;

    let existingContent = await topHomeProductModel.findOne();
    console.log("Header Text: ", headerText);

    try {
      if (!image) {
        existingContent.header = headerText;
        console.log("Header Text Getting Updated: ");
        const newDoc = await topHomeProductModel.findOneAndUpdate(
          { _id: existingContent._id },
          existingContent,
          {
            new: true,
          }
        );

        return response.status(201).json(newDoc);
      }
      console.log("IMAGE UPDATE");
      cloudinary.uploader.upload(
        image.path,
        { folder: "/ButterScotch(AgreenethOnline)/" },
        async (error, results) => {
          if (error) {
            console.log("Error Occured");
            return console.log(error);
          }
          const image_url = results.url;

          const imageArray = image_url.split(":");
          const protocall = imageArray[0] + "s:";
          const https_image_url = protocall + imageArray[1];
          existingContent.images[indexToChange] = https_image_url;

          const newDoc = await topHomeProductModel.findOneAndUpdate(
            { _id: existingContent._id },
            existingContent,
            {
              new: true,
            }
          );
          return response.status(201).json(newDoc);
        }
      );
    } catch (error) {
      console.log("Server error");
      return response.status(500).json(error);
    }
  });
});

module.exports = router;
