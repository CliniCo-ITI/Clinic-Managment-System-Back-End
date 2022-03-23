const mongoose = require('mongoose');
// Database connection open
const connection = async ()=> {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        });
    }catch(err)
    {
        console.log("DB Connection Error");
    }
}
module.exports = connection;