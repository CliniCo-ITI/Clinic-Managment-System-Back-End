const { signUp, signin } = require("../Controllers/authController");
const express = require("express");
const authRouter = express.Router();
const {ValidateToken} = require('./../middleware/validation/validateToken')
const {IsPatient} = require('./../middleware/validation/isPation')
const {IsAdmin} =require('./../middleware/validation/isAdmin')
const {IsDoctor} = require('./../middleware/validation/isDoctor')
const {IsReceptionist} = require('./../middleware/validation/isEmployee');
const multer = require("multer");
const upload = require("../middleware/uploadImage");

authRouter.post("/register", upload.single("image"), signUp);
authRouter.post('/login',signin);

authRouter.get("/patien",ValidateToken,IsPatient,function (req, res) {

    res.status(200)
        .send({
            message: "Congratulations! but there is no hidden content"
    });
    // if (!req.user) {
    //     res.status(403)
    //     .send({
    //         message: "Invalid JWT token"
    //     });
    // }
    // if (req.user.userType == "patient") {
    //     res.status(200)
    //     .send({
    //         message: "Congratulations! but there is no hidden content"
    //     });
    // } else {
    //     res.status(403)
    //     .send({
    //         message: "Unauthorised access"
    //     });
    // }
    });



    // authRouter.get("/admin", ValidateToken,IsAdmin, function (req, res) {

    //     res.status(200)
    //         .send({
    //             message: "Congratulations! but there is no hidden content"
    //     });
    // })    

    authRouter.get("/admin/doctor", ValidateToken,IsAdmin, function (req, res) {

        res.status(200)
            .send({
                message: "Congratulations! but there is no hidden content"
        });
    }) 

    authRouter.get("/receptionist", ValidateToken,IsReceptionist, function (req, res) {

        res.status(200)
            .send({
                message: "Congratulations! but there is no hidden content"
        });
    }) 

module.exports = authRouter;
