const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const Image = require("../models/Image");
const Resume = require("../models/Resume");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

var storageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profileUploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"-"+ file.originalname)
    }
});
 
var upload = multer({ storage: storageProfile });
var type = upload.single("profile");

router.post("/resume", upload.single("resume"), (req, res) => {
  //console.log(req.file)
  Resume.create({
      resumeName: req.file.filename ,
      originalName: req.file.originalname
    }).then(result => res.json(result)).catch(err => console.log(err))
});

router.post("/profile", type, async (req, res, next) => {
  const uploadfile = req.file
  //console.lof(uploadfile)

  Image.create({
    imageName: req.file.filename ,
  }).then(result => res.json(result)).catch(err => console.log(err))
});
module.exports = router;
