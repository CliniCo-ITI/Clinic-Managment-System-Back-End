const express = require('express');
const {getDoctorById,getAllDoctors,addDotor,updateDoctor,deleteDoctor} = require('./../Controllers/admindoctorController');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const { IsAdmin } = require('./../middleware/validation/isAdmin');
const multer = require("multer");
const upload = require("../middleware/uploadImage");
const router = express.Router();


router.get("/doctor",ValidateToken,IsAdmin,getAllDoctors);
router.get("/doctor/:id",ValidateToken,IsAdmin,getDoctorById);
router.post("/doctor",ValidateToken,IsAdmin,upload.single("image"),addDotor);
router.put("/doctor/:id",ValidateToken,IsAdmin,updateDoctor)
router.delete("/doctor/:id",ValidateToken,IsAdmin,deleteDoctor);




module.exports = router;