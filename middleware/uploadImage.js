const path        = require("path");
const multer      = require("multer");
const req = require("express/lib/request");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        if (file.fieldname === "image") {
            cb(null, './uploads/images/')
        }
        else if (file.fieldname === "ppl") {
            cb(null, './uploads/ppl/');
        }
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + Date.now() + file.originalname);
        if (file.fieldname === "image") {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }
        else if (file.fieldname === "ppl") {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }
    }
});
const uploadFilter = function(req, file, cb) {
    // filter rules here
        var typeArray = file.mimetype.split('/');
        var fileType = typeArray[1];
        if (fileType.toLowerCase() == 'jpg' || fileType.toLowerCase() == 'png') {
            cb(null, true);
        } else {
            cb(null, false)
        }
}

const upload = multer({ 
    storage: storage,
    limits: {fieldSize : 1024 * 1024 * 3} ,
    // fileFilter: uploadFilter
});


module.exports = upload;