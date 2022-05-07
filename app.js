const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require('cors');

const authRouter = require("./Routes/authRoute");
const adminRouter = require("./Routes/adminRouter");
const adminRecepRouter = require("./Routes/adminreceptionistRouter");
const recepRouter = require("./Routes/receptionistRouter");
const adminDoctorRouter = require('./Routes/admindoctorRouter');
const doctorRouter = require('./Routes/doctorRouter')
const medicine = require("./Routes/medicineRouter");
const clinic = require("./Routes/clinicRouter");
const prescription = require("./Routes/prescriptionRouter");
const DBConnect = require("./config/connectDB");
const PORT = process.env.PORT || 8080;

// Connect to Database (CMS)
DBConnect();

//Cors middleware to enable requests 
app.use(cors())

//middleware for json 
app.use(bodyParser.json());

//middleware for html forms
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb'} ));

// Serve files
app.use('/uploads',express.static('uploads'));

//Auth Router
app.use(authRouter);

// Admin middlewares
app.use('/admin/profile',adminRouter);
app.use('/admin',adminDoctorRouter)
app.use('/admin/receptionist',adminRecepRouter);
app.use("/admin/clinics",clinic);
app.use("/admin/medicines",medicine);

// Receptionist middlewares 
app.use(doctorRouter)
app.use('/receptionist',recepRouter);

// Routes
app.use("/invoices",require('./Routes/invoiceRoute'));
app.use("/appointments",require('./Routes/appointmentRouter'));
// app.use("/medicines",medicine);
// app.use("/clinics",clinic);
app.use("/prescriptions",prescription);

// Check database connection
// Starting the server

mongoose.connection.once("open", () => {
  console.log("DB Connected");
  app.listen(PORT || 8080, () => {
    console.log(`Server started at port ${PORT}`);
  });
});
 

  app.use((error, request, response, next) => {
    error.status = error.status || 500;
    response.status(error.status).send("Sorry there is an Error " + error);

})
 
  
