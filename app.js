require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authorRoutes = require("./authors/authors.routes");

//import mongoose
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8888;

//establish connection to database
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log(
      "MongoDB Connection -- Ready state is:",
      mongoose.connection.readyState
    );
  }
);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", authorRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
