require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const authRouter = require("./Routes/authRoute");
const recepAdminRouter = require("./Routes/adminreceptionistRouter");
const recepRouter = require("./Routes/receptionistRouter");
const adminDoctorRouter = require('./Routes/admindoctorRouter');
const doctorRouter = require('./Routes/doctorRouter')
const medicine = require("./Routes/medicineRouter");
const clinic = require("./Routes/clinicRouter");
const receptionist = require("./Routes/receptionistRouter");
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
app.use(bodyParser.urlencoded({ extended: false }));


// Serve files
app.use('/uploads',express.static('uploads'));

//Auth Router
app.use(authRouter);

// Admin middlewares
app.use('/admin',adminDoctorRouter)
app.use('/admin/receptionist',recepAdminRouter);

// Receptionist middlewares 
app.use(doctorRouter)
app.use('/receptionist',recepRouter);

// Routes

app.use(authRouter);
app.use("/invoices",require('./Routes/invoiceRoute'));
app.use("/appointments",require('./Routes/appointmentRouter'));
app.use("/medicines",medicine);
app.use("/clinics",clinic);
app.use("/receptionists",receptionist);
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
 
  
