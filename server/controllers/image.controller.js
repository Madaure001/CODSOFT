const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const Image = require("../models/Image");

const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

const upload = multer();
const para = upload.single("file")

async function ImageUpload (para, req, res) {

    // Create a new image model and fill the properties
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.userId
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });/* 
    const { file } = req;
    const data = req.body
    const userId = data.userId
    if (
        file.detectedFileExtension != ".jpg" &&
        file.detectedFileExtension != ".jpeg" &&
        file.detectedFileExtension != ".png"
    ) {
        res.status(400).json({
        message: "Invalid format",
        });
    } else {
        const filename = `${uuidv4()}${file.detectedFileExtension}`;

        pipeline(
        file.stream,
        fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
        )
        .then(() => {
            res.send({
            message: "Profile image uploaded successfully",
            url: `/host/profile/${filename}`,
            });
        })
        .catch((err) => {
            res.status(400).json({
            message: "Error while uploading",
            });
        });
    }*/
}
module.exports = ImageUpload;