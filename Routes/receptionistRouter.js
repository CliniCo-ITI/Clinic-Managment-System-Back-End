const express = require('express');
const {getRecepById,updateRecep} = require('./../Controllers/receptionistController');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const multer = require("multer");
const upload = require("../middleware/uploadImage");
const recepProfileRouter = express.Router();




recepProfileRouter.get("/:recepId",ValidateToken,getRecepById);
recepProfileRouter.put("/:recepId",ValidateToken,upload.single("image"),updateRecep);




module.exports = recepProfileRouter;


