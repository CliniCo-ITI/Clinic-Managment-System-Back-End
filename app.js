const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const authRouter = require("./Routes/authRoute");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
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
  app.use(authRouter);
  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
 
  
