const userModel = require("../models/userModel");

//========  Get user  ===========//

exports.getUser = async (req, res, next) => {
  try {
    let check = await userModel.findById({ _id: req.params.userId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.userId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
