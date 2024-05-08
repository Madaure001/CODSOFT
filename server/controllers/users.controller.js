const express = require("express");
const User = require("../models/User.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = require("../utils/generateTokens.js");
const Recruiter = require("../models/Recruiter.js");
const Applicant = require("../models/Applicant.js");
const authKeys = require("../utils/authKeys.js");


async function CreateUsers (req, res) {

    const data = req.body;
    if( !data.type) {
      return  res.status(500).json({ error: "Account type required"});
    }
    try {
      const userDetails = data.type === "recruiter"
        ? new Recruiter({
            userId: data.userId,
            fullName: data.fullName,
            location: data.location,
            about: data.about,
            profile: data.companyLogo
          })
        : new Applicant({
          userId: userId,
          phoneNumber: data.phoneNumber,
          fullName: data.fullName,
          skills: data.skills,
          resume: data.resume,
          about: data.about,
          profile: data.image
      });

        if (userDetails) {
          
          await userDetails.save()
          //generate JWT token
          //generateTokenAndSetCookie(userDetails._id, data.type, res);
          //userDetails to display on client
          data._id = userDetails._id;
          res.status(200).json(data);
        }
    } catch (error) {
      console.log("Error in CreateUsers: ", error.message)
      res.status(500).json({ error: "Internal server error"});
    }
}
module.exports = CreateUsers