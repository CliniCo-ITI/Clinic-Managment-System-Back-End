const User = require('../Model/User');
const Recep = require('../Model/Receptionist');
const upload = require("../middleware/uploadImage");
const bcrypt = require("bcrypt");


exports.getRecepById = async (req,res)=>{
    try{
        const recep = await Recep.findById(req.params.recepId);
        recep
        .populate({path: "userRef"})
        .then(recepData => res.json(recepData))
    }catch(err){
        res.json({msg: err});
    }
}

exports.updateRecep = async (req,res)=>{
    try{
    const recep = await Recep.findById(req.params.recepId)
    const recepToUpdate = await Recep.updateOne(
        {_id: req.params.recepId},
        {
            $set: {
                salary: req.body.salary,
                clinic: req.body.clinic,
            }
        })
        const userToUpdate = await User.updateOne(
            {_id: recep.userRef},
        {
            $set: {
                image: req.file.filename,
                age: req.body.age,
                phoneNumber: req.body.phoneNumber
            }
        })
        res.json([userToUpdate,recepToUpdate])

    }catch(err){
        res.json({message: err})
    }
}