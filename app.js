require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRouter = require("./Routes/authRoute");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const DBConnect = require("./config/connectDB");

// Connect to Database (CMS)
DBConnect();

//middleware for json 
app.use(bodyParser.json());

//middle ware for html forms
app.use(bodyParser.urlencoded({ extended: false }));

//serve files
app.use("/uploads", express.static("uploads"));

// Routes

app.use(authRouter);
app.use("/invoices",require('./Routes/invoiceRoute'));
app.use("/appointments",require('./Routes/appointmentRouter'));
// app.get("/", (req, res) => {
//   res.json({ message: "Hello World" });
// });


// Check database connection
// Starting the server

mongoose.connection.once("open", () => {
  console.log("DB Connected");
  app.listen(PORT || 8080, () => {
    console.log(`Server started at port ${PORT}`);
  });
});
