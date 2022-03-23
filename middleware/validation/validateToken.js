
const {jwt_secret} = require('./../../config/secrets')
const jwt = require('jsonwebtoken');

const ValidateToken = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token,jwt_secret);
        req.user = user;
        next();
    }
    catch(err){
        console.log(err)
        res.status(400).json({msg:'Invalid User Token'});
    }
}




module.exports = {ValidateToken};

