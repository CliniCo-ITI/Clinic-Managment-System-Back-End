const mongoose = require("mongoose");
const express = require("express");
const app = express();


// Connect to Database (CMS)
mongoose
  .connect("mongodb://localhost:27017/CMS")
  .then(() => {

    console.log("DB Connected");
    // Connect to the server
    app.listen(8080, () => {
        console.log("running at http://localhost:8080");
      })
  })
  .catch(() => {
    console.log("DB Connection Error");
  });


  /**************Middlewares***** */

  app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
  });
  
