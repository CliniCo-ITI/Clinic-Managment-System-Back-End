const express = require('express');
const {getReceps,addRecep,getRecepById,updateRecep,deleteRecep} = require('./../Controllers/adminreceptionistController');
const {ValidateToken} = require('./../middleware/validation/validateToken');
const { IsAdmin } = require('./../middleware/validation/isAdmin');
const multer = require("multer");
const upload = require("../middleware/uploadImage");
const adminRecepRouter = express.Router();


adminRecepRouter.get("/",ValidateToken,IsAdmin,getReceps);
adminRecepRouter.get("/:recepId",ValidateToken,IsAdmin,getRecepById);
adminRecepRouter.post("/add",ValidateToken,IsAdmin,upload.single("image"),addRecep);
adminRecepRouter.put("/:recepId",ValidateToken,IsAdmin,updateRecep)
adminRecepRouter.delete("/:recepId",ValidateToken,IsAdmin,deleteRecep);




module.exports = adminRecepRouter;