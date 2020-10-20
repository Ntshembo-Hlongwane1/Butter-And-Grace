const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  masterAdmin: { type: Boolean, default: false },
});

const adminsModel = mongoose.model("admins", userSchema);

module.exports = { adminsModel };
