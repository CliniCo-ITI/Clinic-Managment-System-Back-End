const User = require('../Model/User');
const bcrypt = require("bcrypt");



exports.getAdminById = async (req,res,next)=>{
    const {id} = req.params;
    console.log(id);
    // try{
    //     const user = await User.findById(id);
    //     user
    //     .then(data=>res.json(data))
    // }catch(error){
    //     res.status(404).json({msg:error})
    // }
    try{
        const user = await User.findById(id);
        const retrievedUser = await res.json(user);
        console.log( retrievedUser);
    }catch(error){
        res.status(404).json({msg:error})
    }
    
}