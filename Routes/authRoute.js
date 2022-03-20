const { signUp, signin } = require("../Controllers/authController");
const express = require("express");
const authRouter = express.Router();
const { ValidateToken } = require("./../middleware/validation/validateToken");
const multer = require("multer");
const upload = require("../middleware/uploadImage");


authRouter.post("/register", upload.single("image"), signUp);
authRouter.post("/login", signin);
authRouter.get("/patientPage", ValidateToken, function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }
  if (req.user.userType == "patient") {
    res.status(200).send({
      message: "Congratulations! but there is no hidden content",
    });
  } else {
    res.status(403).send({
      message: "Unauthorised access",
    });
  }
});

module.exports = authRouter;
