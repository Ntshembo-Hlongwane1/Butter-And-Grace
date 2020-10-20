const router = require("express").Router();
const Formidable = require("formidable");
const { userModel } = require("../../Models/Users/users");
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("dotenv");

//===================================================MongoDB Session configs============================================

//=====================================================USER AUTHENTICATION==============================================

router.post("/api/user-register", (request, response) => {
  const form = new Formidable.IncomingForm();
  try {
    form.parse(request, async (error, fields, files) => {
      const {
        email,
        password,
        verifiedPassword,
        firstName,
        lastName,
        isActive,
      } = fields;

      if (!email || !password || !verifiedPassword || !firstName || !lastName) {
        return response
          .status(400)
          .json({ msg: "All fields are to be entered. " });
      }

      if (password.lenghth < 5) {
        console.log("PASSWORD LESS 5");
        return response
          .status(400)
          .json({ msg: "Password has to be atleast 5 characters. " });
      }

      if (password !== verifiedPassword) {
        console.log("PASSWORDS DO NOT MATCH");
        return response.status(400).json({ msg: "Passwords do not match" });
      }

      const existingUser = await userModel.findOne({ email: email });

      if (existingUser) {
        console.log("User exist");
        return response
          .status(400)
          .json({ msg: "User with this email already exist." });
      }

      const salt = await Bcrypt.genSalt(15);
      const hashedPassword = await Bcrypt.hash(password, salt);

      const newUser = new userModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        isActive,
      });

      const savedUser = await newUser.save();

      const transporter = nodemailer.createTransport({
        service: "SendinBlue",
        auth: {
          user: process.env.sendinBlue__email,
          pass: process.env.sendinBlue__key,
        },
      });

      const mailOptions = {
        from: process.env.sendinBlue__email,
        to: email,
        subject: "Activate your account",
        html: `
    
                <h3>Follow the link below for account activation</h3>
                <a href="http://localhost:5000/account-activation/${savedUser._id} " target="_blank" >Account Activation</a>
            
            `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return response
            .status(500)
            .json({ msg: "Message was not sent please try again later" });
        }
        return response.status(201).json({
          msg: `Email has been seen to  ${email} for account activation`,
        });
      });
    });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Server is currently down try again later" });
  }
});

router.get("/account-activation/:id", async (request, response) => {
  try {
    const user_id = request.params.id;

    const user = await userModel.findOne({ _id: user_id });

    if (!user) {
      return response.status(400).json({ msg: "User does not exist" });
    }

    user.isActive = true;
    const updatedDoc = await userModel.findOneAndUpdate(
      { _id: user_id },
      user,
      {
        new: true,
      }
    );

    return response.status(200).send(`

        <h1>Account has be activated</h1>
        <a href="http://localhost:3000/user-signin">Log in</a>
    
    `);
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Server is currently down try again later" });
  }
});

router.post("/api/user-login", (request, response) => {
  try {
    const form = new Formidable.IncomingForm();
    form.parse(request, async (error, fields, files) => {
      const { email, password } = fields;

      if (!email || !password) {
        return response
          .status(400)
          .json({ msg: "All fields have be to entered" });
      }
      const user = await userModel.findOne({ email: email });

      if (!user) {
        return response
          .status(400)
          .json({ msg: "No user with this email exists" });
      }

      const verfyPassword = await Bcrypt.compare(password, user.password);

      if (!verfyPassword) {
        return response
          .status(400)
          .json({ msg: "Invalid credential verify your email and password" });
      }

      const token = jwt.sign({ sid: user._id }, process.env.session_secret, {
        expiresIn: "1d",
      });

      return response.status(200).json(token);
    });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Server is currently down please try again later" });
  }
});

module.exports = router;
