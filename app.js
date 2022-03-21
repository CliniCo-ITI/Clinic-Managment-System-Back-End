const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./Routes/authRoute");
const adminDoctorRouter = require('./Routes/admindoctorRouter');
const doctorRouter = require('./Routes/doctorRouter')
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Connect to Database (CMS)
mongoose
  .connect("mongodb://localhost:27017/CMS")
  .then(() => {

    console.log("DB Connected");
    // Connect to the server
    app.listen(process.env.PORT || 8080, () => {
        console.log("running at http://localhost:8080");
      })
  })
  .catch(() => {
    console.log("DB Connection Error!!!!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
  /**************Middlewares***** */
  app.use('/uploads',express.static('uploads'));
  app.use(authRouter);
  app.use('/admin',adminDoctorRouter)
  app.use(doctorRouter)
  
  
  

  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
 
  
