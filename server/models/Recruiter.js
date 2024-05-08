const mongoose = require("mongoose");

let recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String      
    },
    about: {
      type: String,
      require: true,
    }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("Recruiter", recruiterSchema);
