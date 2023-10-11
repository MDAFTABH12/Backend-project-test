const jwt = require("jsonwebtoken");

exports.jwtAuth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is required",
      });
    }
    let decode = await jwt.verify(token, `${process.env.SECRET_KEY}`);
    if (!decode) {
      return res.status(400).send({
        success: false,
        message: "Invailid token",
      });
    }
    if (decode._id != req.params.userId) {
      return res.status(400).send({
        success: false,
        message: "Invailid token",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
