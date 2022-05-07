const express = require('express');
const {getAdminById} = require('./../Controllers/adminController');
const  user = require('./../Model/User');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const { IsAdmin } = require('./../middleware/validation/isAdmin');

const router = express.Router();



// router.route("/doctor")
// .get('/:id',ValidateToken,IsAdmin,getDoctorById)

router.get("/:id",ValidateToken,IsAdmin,getAdminById);


module.exports = router;