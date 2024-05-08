const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    desc: String,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Logo", logoSchema);