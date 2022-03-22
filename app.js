const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./Routes/authRoute");
const bodyParser = require("body-parser");
const medicine = require("./Routes/medicine");
const clinic = require("./Routes/clinic");
const receptionist = require("./Routes/receptionist");
const prescription = require("./Routes/prescription");



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
  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });


  app.use("/medicine",medicine);
  app.use("/clinic",clinic);
  app.use("/receptionist",receptionist);
  app.use("/prescription",prescription);


  

  app.use((error, request, response, next) => {
    error.status = error.status || 500;
    response.status(error.status).send("Sorry there is an Error " + error);

})
 
  
