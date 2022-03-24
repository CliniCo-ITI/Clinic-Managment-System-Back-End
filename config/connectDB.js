const mongoose = require('mongoose');
// Database connection open
const connection = async ()=> {
    try{
        await mongoose.connect("mongodb://localhost:27017/CMS", {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
    }catch(err)
    {
        console.log("DB Connection Error");
    }
}
module.exports = connection;