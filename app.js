require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
//routes
const authorRoutes = require("./authors/authors.routes");
const userRoutes = require("./users/users.routes");
const categoryRoutes = require("./categories/categories.routes");
const courseRoutes = require("./courses/courses.routes");
const videoRoutes = require("./videos/video.routes");
const linkRoutes = require("./links/links.routes");

//import mongoose
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.disable("x-powered-by");

app.use("/api/v1", authorRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", courseRoutes);
app.use("/api/v1", videoRoutes);
app.use("/api/v1", linkRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
