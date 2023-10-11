const userController = require("../controllers/userController");
const userMidd = require("../middlewares/userMidd");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.post("/userRegister", userController.userRegister);
router.post("/userLogin", userController.userLogin);

router.get("/getAllUsers", userController.getAllUsers);
router.get(
  "/getByUserId/:userId",
  userMidd.getUser,
  userController.getByUserId
);

router.put(
  "/userUpdate/:userId",
  userMidd.getUser,
  auth.jwtAuth,
  userController.userUpdate
);
router.put(
  "/userDisable/:userId",
  userMidd.getUser,
  userController.userDisable
);

module.exports = router;
