const { response } = require("express");
const { validationResult, body } = require("express-validator");
const medicine = require("../Model/Medicine");



/***************List Of Medicine***************/

exports.getMedicine = function (req, res, next) {
    medicine.find({}).populate({path:'clinics'})

        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => next(error));
}

/***************Medicine By ID***************/

exports.getMedicineById = async (req, res, next)=>{

    const {id} = req.params;
    console.log(id);
    try{
        const mid = await medicine.findById(id);
        mid
        .populate({path:"clinics"})
        .then(data=>res.json(data))
    }catch(error){
        res.json({msg:error})
    }
    
}

/***************Creat New Medicine*************/

exports.createMedicine = function (req, res, next) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " , ", "");
        next(error);
    }
    else {
        
        let medicineObject = new medicine({
            name:req.body.name,
            // productionDate: req.body.productionDate,
            // expirationDate: req.body.expirationDate,     
            price: req.body.price,
            description: req.body.description,
            clinics: req.body.clinics
        })

        medicineObject.save()
            .then(result => {
                res.status(201).json({ message: "added" })
            }).catch(error => { next(error) });
    }
}

/***************Update Medicine****************/

// exports.updateMedicine = function (req, res, next) {
//     medicine.updateOne({ description: req.body.description },
//         {
//             $set: {
//                 productionDate: req.body.productionDate,
//                 expirationDate: req.body.expirationDate,
//                 price: req.body.price,
//                 clinics: req.body.clinics
//             }
//         }).then(result => {
//             res.status(201).json({ message: "updated" });
//         }).catch(error => {
//             error.status = 500;
//             next(error);
//         })
// }
exports.updateMedicine = async (req, res, next) => {

    const {id} = req.params;
    console.log(id);
    const {name,productionDate,expirationDate,price,description} = req.body;
    try{
        const med = await medicine.findByIdAndUpdate(id,{
            name,
            // productionDate,
            // expirationDate,
            price,
            description
        },
        {
            new:true
        }
        );
            res.json({ med });
        }catch(error){
            res.json({msg:"error"})
        }
   
}

/***************Delete Medicine***************/



exports.deleteMedicine = async (req, res, next) => {
    const {id} = req.params
    console.log(id);
    try{
        await medicine.findByIdAndDelete(id);
        res.status(200).json({msg: "medicin Deleted Successfully"})
    }
    catch(error){
        res.json({msg:error})
    }  

 
}


