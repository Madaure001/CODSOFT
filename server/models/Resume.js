const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    
    resumeName: String,
    originalName: String
    
})

module.exports = mongoose.model("Resume", resumeSchema);