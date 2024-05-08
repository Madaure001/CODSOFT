const mongoose = require("mongoose");

let applicationsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    recruiterId: {
      type: String,
      
    },
    jobId: {
      type: String,
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    noticeperiod: String,
    employmentStatus: String,
    coverLetter: {
      type: String,
      validate: {
        validator: function (v) {
          return v.split(" ").filter((ele) => ele != "").length <= 250;
        },
        msg: "Statement of purpose should not be greater than 250 words",
      },
    },
  },
  { collation: { locale: "en" } }
);


module.exports = mongoose.models.Applications ||mongoose.model("Applications", applicationsSchema);
