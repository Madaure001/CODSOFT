const User = require("../models/User");
const bcrypt = require("bcrypt");
//const passport = require("passport");
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = require("../utils/generateTokens.js");
const authKeys = require("../utils/authKeys.js");
const Recruiter = require("../models/Recruiter.js");
const Applicant = require("../models/Applicant.js");
require("dotenv").config()

async function Login  (req, res) {
  try {
    const {username, password} = req.body;
    //find one user in the database
    const user = await User.findOne({username});

    if (!user ){                           //invalid username or wrong password
      return res.status(400).json({error: "username does not exist"});
    }
                   
    const isPasswordCorrect = await bcrypt.compare(password, user.password || "");  //compare password to user password or an empty string for invalid username
    if (!isPasswordCorrect){                           //invalid username or wrong password
      return res.status(400).json({error: "Invalid password"});
    }
    
    //if user is found and password match
    //const token = generateTokenAndSetCookie(user._id, user.type, res);
    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey); 
    
    const accountType = user.type === "recruiter" ?
      await Recruiter.findOne({userId: user._id}) :
      await Applicant.findOne({userId: user._id}) 

    res.status(200).json({                                  //retrieve the user details
      _id: user._id,
      email: user.email,
      username: user.username,
      type: user.type,
      token: token,
      image: user.type === "recruiter" ? accountType.image : accountType.profile,
      about: accountType.about,
      profileImage: accountType.profileImage,
      location: user.type === "recruiter" ? accountType.location : ""
    })

  } catch (error) {
      console.log("Error in login contoller", error.message);
      res.status(500).json({error: "Internal Server Error"});
  }
}

module.exports = Login;

