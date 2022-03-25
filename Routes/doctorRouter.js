const express = require('express');
const {getDoctorById,updateDoctor} = require('./../Controllers/doctorController');
const Docter = require('./../Model/Doctor');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const { IsDoctor } = require('./../middleware/validation/isDoctor');
const multer = require("multer");
const upload = require("../middleware/uploadImage");
const router = express.Router();



// router.route("/doctor")
// .get('/:id',ValidateToken,IsAdmin,getDoctorById)

router.get("/doctor/:id",ValidateToken,IsDoctor,getDoctorById);
// router.post("/doctor/:id",ValidateToken,IsDoctor ,upload.single("image"),updateDoctor);
 router.put("/doctor/:id",ValidateToken,IsDoctor ,upload.fields([{
        name: 'image', maxCount: 1
    }, {
        name: 'ppl', maxCount: 1
    }]),updateDoctor);


// router.delete("/doctor/:id",ValidateToken,IsAdmin,deleteDoctor);
// router.put("/doctor/:id",ValidateToken,IsAdmin,updateDoctor);
module.exports=router;

