const path        = require("path");
const multer      = require("multer");
const req = require("express/lib/request");


const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,path.join(__dirname,'../uploads/images'))
    },
    filename: function(req,file,callback){
        callback(null,Date.now() + file.originalname)
    }
})


const upload = multer({ 
    storage: storage,
    limits: {
        fieldSize : 1024 * 1024 * 3
    }
})

module.exports = upload;