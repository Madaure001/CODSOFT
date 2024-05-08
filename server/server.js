const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer")
const bodyParser = require("body-parser");
const connectToDB = require("./db/mongoDB");
const passportConfig = require("./utils/passportConfig");
require('dotenv').config();
connectToDB();

// initialising directories
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
app.use(express.json());
app.use(express.static("public"))

app.use(cors());
app.use(passportConfig.initialize());
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Routing
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
