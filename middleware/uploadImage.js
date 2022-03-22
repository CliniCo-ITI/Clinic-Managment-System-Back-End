const path        = require("path");
const multer      = require("multer");
const req = require("express/lib/request");


const storage = multer.diskStorage({
    // destination: function(req,file,callback){
    //     callback(null,path.join(__dirname,'../uploads/images'))
    // },
    // filename: function(req,file,callback){
    //     callback(null,Date.now() + file.originalname)
    // }
    destination: (req, file, cb) => {
        if (file.fieldname === "image") {
            cb(null, './uploads/images/')
        }
        else if (file.fieldname === "ppl") {
            cb(null, './uploads/ppl/');
        }
     },
        filename:(req,file,cb)=>{
            if (file.fieldname === "image") {
                cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
            }
            else if (file.fieldname === "ppl") {
                cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
            }
     }
})



const upload = multer({ 
    storage: storage,
    limits: {
        fieldSize : 1024 * 1024 * 3
    }});
// }).fields(
//     [
//         {
//             name:'image',
//             maxCount:1
//         },
//         {
//             name: 'ppl', maxCount:1
//         }
//     ]
// );

module.exports = upload;