const mongoose = require("mongoose");

let applicantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    skills: [String],
    profileImage: {
      type: String,
    },
    about: {
      type: String
    }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.models.Applicant || mongoose.model("Applicant", applicantSchema);
