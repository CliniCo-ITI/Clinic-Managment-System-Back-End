const User = require('../Model/User');
const Recep = require('../Model/Receptionist');
const upload = require("../middleware/uploadImage");
const bcrypt = require("bcrypt");
const { json } = require('body-parser');



exports.getReceps =(req,res)=>{

    const receps = Recep.find()
    .populate({path: "userRef clinic"})
    .then(receps => res.json(receps).data)
    .catch(err => res.json({message: err}));
}

exports.getRecepById = async (req,res)=>{
    try{
        const recep = await Recep.findById(req.params.recepId);
        recep
        .populate({path: "userRef clinic"})
        .then(recepData => res.json(recepData))
    }catch(err){
        res.json({msg: err});
    }
}

exports.addRecep = (req,res)=>{
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        image: req.file?.path,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        userType: req.body.userType,
      });
    if (req.body.userType === "receptionist") {
    const newRecep = new Recep({
        salary: req.body.salary,
        clinic: req.body.clinic,
        userRef: newUser._id
    })
        .save()
        .then((object) => {
        newUser
            .save()
            .then()
            .catch((err) => {
            console.log(err);
            });
        res.status(201).json({ message: "Recep added" });
        })
        .catch((err) => {
        console.log(err);
        });
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
                phoneNumber: req.body.phoneNumber
            }
        })
        res.json([userToUpdate,recepToUpdate])

    }catch(err){
        res.json({message: err})
    }
}
exports.deleteRecep = async (req,res)=>{
    try{
        const recepToBeRemoved = await Recep.findById(req.params.recepId)
        // res.json(recepToBeRemoved)

        const userToBeRemoved = await User.findById(recepToBeRemoved.userRef)
        const deletedRecep = await Recep.findByIdAndDelete(req.params.recepId)
        const deletedUser = await User.findByIdAndDelete(userToBeRemoved._id)
        res.json("receptionist deleted")
    }catch(err){
        res.json({message: err})
    }
}



