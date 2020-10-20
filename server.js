const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

//========================================================APP CONFIGS===================================================
const app = express();
dotenv.config();
const mongoURI = process.env.mongoURI;
mongoose.connect(
  mongoURI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (error) => {
    if (error) {
      return console.log(error);
    }
    return console.log("Connection to MongoDB successful");
  }
);

//=========================================================MIDDLEWARE===================================================
app.use(cors());

//========================================================ROUTE CONSTANTS===============================================
const hompageContentRoute = require("./Routes/HomePage/homePage");
const productUploadRoute = require("./Routes/Products/uploadProducts");
const productFetchRoute = require("./Routes/Products/fetchProducts");
const userAuthentication = require("./Routes/Auth/userAuth");
const adminAuthRoute = require("./Routes/Auth/adminsAuth");
//========================================================ROUTE ENTRY POINTS============================================
app.use(hompageContentRoute);
app.use(productUploadRoute);
app.use(productFetchRoute);
app.use(userAuthentication);
app.use(adminAuthRoute);
//=========================================================PRODUCTION SETUP=============================================
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(
      path.resolve(__dirname, "./client", "build", "index.html")
    );
  });
}

//========================================================SERVER ENTRY POINT============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
