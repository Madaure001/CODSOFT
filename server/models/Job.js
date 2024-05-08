const mongoose = require('mongoose');
const  models  = require( 'mongoose');

const jobSchema =  new mongoose.Schema(
    {
         postedBy: {
            type: String,
            required: true,
        },
        jobTitle: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
        companyLogo: {type: String},
        jobLocation: {
            type: String,
            required: true
        },
        minSalary: {
            type: String,
            required: true
        },
        maxSalary: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
         employmentType: {
            type: String,
            required: true
        },
         referenceNumber: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
        },
        KeyResAreas: [String],
        jobReqs: [String],
        jobBenefits: [String],
        jobPostingDate: {
            type: Date,
            required: true
        },
        maxApplicants: {
            type: Number,
            validate: [
                {
                validator: Number.isInteger,
                msg: "maxApplicants should be an integer",
                },
                {
                validator: function (value) {
                    return value > 0;
                },
                msg: "maxApplicants should greater than 0",
                },
            ],
        },

        activeApplications: {
            type: Number,
            default: 0,
            validate: [
                {
                validator: Number.isInteger,
                msg: "activeApplications should be an integer",
                },
                {
                validator: function (value) {
                    return value >= 0;
                },
                msg: "activeApplications should greater than equal to 0",
                },
            ],
        },
        
    },
    {timestamps: true},
    { collation: { locale: "en" } }
);

module.exports = mongoose.models.NewJob || mongoose.model("NewJob", jobSchema);