const userModel = require("../models/userModel");
const jwt = require ("jsonwebtoken");
const bcrypt = require("bcrypt");

//==========  User register  ============//

exports.userRegister = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }
    let check = await userModel.findOne({ email: email });
    if (check) {
      return res
        .status(400)
        .json({ success: false, message: "This email already register" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({
      email: email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User register successfull",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//==========  User login  ============//

exports.userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    let user = await userModel.findOne({ email: email });
    let comparePassword = await bcrypt.compare(password, user.password);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Password is worng" });
    }

    let token = jwt.sign({ _id: user._id }, `${process.env.SECRET_KEY}`);
    user._doc.token = token;
    return res.status(200).json({
      success: true,
      message: "User register successfull",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get all users  =========//

exports.getAllUsers = async (req, res) => {
  try {
    let user = await userModel.find();
    if (!user.length) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User fetch successfull", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by userId  =========//

exports.getByUserId = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetch successfull",
      data: req.userId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User update  =========//

exports.userUpdate = async (req, res) => {
  try {
    let { name, address, mobile } = req.body;

    let user = await userModel.findByIdAndUpdate(
      { _id: req.userId._id },
      {
        $set: {
          name: name,
          address: address,
          mobile: mobile,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "User update successfull", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User disable  =========//

exports.userDisable = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await userModel.findByIdAndUpdate(
      { _id: userId._id },
      {
        $set: {
          disable: !userId.disable,
        },
      },
      { new: true }
    );
    if (user.disable) {
      return res.status(200).json({ success: true, message: "User is enable" });
    }
    return res.status(200).json({ success: true, message: "User is disable" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
