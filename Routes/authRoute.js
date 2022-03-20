const {signUp, signin}  = require("../Controllers/authController");
const {verifyToken}     = require("../middleware/authJWT");
const express           = require("express");
const authRouter        = express.Router();
const multer            = require("multer");
const upload            = require("../middleware/uploadImage");
authRouter.post('/register',upload.single('image'),signUp);
authRouter.post('/login',signin);
authRouter.get("/patientPage", verifyToken, function (req, res) {
    if (!req.user) {
        res.status(403)
        .send({
            message: "Invalid JWT token"
        });
    }
    if (req.user == "patient") {
        res.status(200)
        .send({
            message: "Congratulations! but there is no hidden content"
        });
    } else {
        res.status(403)
        .send({
            message: "Unauthorised access"
        });
    }
    });






module.exports = authRouter;