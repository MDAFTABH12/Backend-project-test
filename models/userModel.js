const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    mobile: Number,
    email: String,
    password: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userModel", userSchema);
