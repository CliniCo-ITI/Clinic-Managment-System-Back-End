const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./Routes/authRoute");
const recepAdminRouter = require("./Routes/adminreceptionistRouter");
const recepRouter = require("./Routes/receptionistRouter");
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
  //admin middlewares:
  app.use('/admin',adminDoctorRouter)
  app.use('/admin/receptionist',recepAdminRouter);
  //receptionist middlewares:  
  app.use(doctorRouter)
  app.use('/receptionist',recepRouter);

  
  
  

  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
 
  
