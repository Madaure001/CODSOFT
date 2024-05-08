const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    
    imageName: String,
    
})

module.exports = mongoose.model("Image", imageSchema);