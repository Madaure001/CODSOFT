const express = require("express");
const User = require("../models/User.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = require("../utils/generateTokens.js");
const Recruiter = require("../models/Recruiter.js");
const Applicant = require("../models/Applicant.js");
const authKeys = require("../utils/authKeys.js");

require("dotenv").config();

const router = express.Router();

async function Signup (req, res) {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const type = data.type;
    const email = data.email;

    const handleErrorInput = require("./handleErrorInput.js");
    const success = handleErrorInput(data);
    
    if(!success) {
        return res.status(400).json({ error: "Invalid user data" });
    };
    //check if username is unique
    const checkUser = await User.findOne({ username, email});

    if (checkUser) {                         
        return res.status(400).json({ error: "username already exist" });
    };    
    
    try {        

        let user =  new User({
            email,
            username,
            password,
            type,
        });
        
        if(user) {
            //generate JWT token
            //const token = generateTokenAndSetCookie(user._id, res);
            const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
            await user.save(); //save the new created user
            //console.log(user)
            
            //create user profile
            const userAccount = user.type === "recruiter" ?
            
                new Recruiter({
                    userId: user._id,
                    fullName: data.fullName,
                    location: data.location,
                    about: data.about,
                    profileImage: data.profileImage
                    
                })
                :  
                new Applicant({
                    userId: user._id,
                    phoneNumber: data.phoneNumber,
                    fullName: data.fullName,
                    skills: data.skills,
                    about: data.about,
                    profileImage: data.profileImage,
                    
            });
            //console.log(userAccount)
            
            if(!userAccount) {
                User.deleteOne({id: user.id})
                console.log("user deleted")
                console.log(error)
                return res.status(500).json({ error: "Could not create account" })
            }
        
            await userAccount.save()
            //console.log(userAccount)
            //return the newly created user
            res.status(201).json({ 
                _id: user._id,
                type: user.type,
                fullName: userAccount.fullName,
                about: userAccount.about,
                token: token,
                username: user.username,
                email: user.email,
                profileImage: userAccount.profileImage,
            });
            
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
        
    } catch (error) { //or cath the error
        
        res.status(500).json({ error: "Internal Server Error" });
        console.log("Error in signup controller ", error.message);        
    }
};
module.exports = Signup;
