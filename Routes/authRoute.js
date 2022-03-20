const {signUp, signin} = require("../Controllers/authController");
const express = require("express");
const authRouter = express.Router();
const {ValidateToken} = require('./../middleware/validation/validateToken')
authRouter.post('/register',signUp);
authRouter.post('/login',signin);
authRouter.get("/patientPage", ValidateToken, function (req, res) {
    if (!req.user) {
        res.status(403)
        .send({
            message: "Invalid JWT token"
        });
    }
    if (req.user.userType == "patient") {
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