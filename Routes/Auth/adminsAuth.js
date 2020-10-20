const router = require("express").Router();
const { adminsModel } = require("../../Models/Users/admins");
const Formidable = require("formidable");
require("dotenv").config();
const Bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const random = require("random");

//======================================================ADMINS ROUTE====================================================
router.post("/api/admins-userRegister", (request, response) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { email, password, firstName, lastName, verifiedPassword } = fields;

    if (!email || !password || !firstName || !lastName || !verifiedPassword) {
      return response
        .status(400)
        .json({ msg: "All fields have to be entered" });
    }

    if (password.length < 8) {
      return response
        .status(400)
        .json({ msg: "Password has to be atleast 8 characters" });
    }

    if (password !== verifiedPassword) {
      return response.status(400).json({ msg: "Passwords have to be match" });
    }

    const exisitingAdmin = await adminsModel.findOne({ email: email });
    if (exisitingAdmin) {
      return response
        .status(400)
        .json({ msg: "Admin with this email already exists" });
    }

    const salt = await Bcrypt.genSalt(15);
    const hashedPassword = await Bcrypt.hash(password, salt);
    const newAdmin = new adminsModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();

    return response.status(200).json({ msg: "New Admin has been added" });
  });
});

router.post("/api/admins-userLogin", (request, response) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { email, password } = fields;

    if (!email || !password) {
      return response
        .status(400)
        .json({ msg: "All fields have to be entered" });
    }

    const admin = await adminsModel.findOne({ email: email });

    if (!admin) {
      return response.status(400).json({ msg: "Unathorized admin" });
    }

    const verifiedPassword = await Bcrypt.compare(password, admin.password);

    if (!verifiedPassword) {
      return response.status(400).json({ msg: "Invalid credentials" });
    }

    const transporter = nodemailer.createTransport({
      service: "SendinBlue",
      auth: {
        user: process.env.sendinBlue__email,
        pass: process.env.sendinBlue__key,
      },
    });
    const verificationCode = random.int(100, 5000);
    const mailOptions = {
      from: process.env.sendinBlue__email,
      to: email,
      subject: "Login in Verification code",
      html: `

            <h1>Login verification code is</h1>
            <h3>${verificationCode}</h3>
        
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return response
          .status(500)
          .json({ msg: "Server currently down please try again later" });
      }
      const token = JWT.sign({id:admin._id}, process.env.session_secret)
      return response.status(200).json({
        msg: "Login Verification code has been sent to your email ",
        code: verificationCode,
        token, 
      });
    });
  });
});

module.exports = router;
