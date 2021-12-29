require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
//routes
const authorRoutes = require("./authors/authors.routes");
const userRoutes = require("./users/users.routes");
const categoryRoutes = require("./categories/categories.routes");
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

// protect api using helmet

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.disable("x-powered-by");

app.use("/api/v1", authorRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
