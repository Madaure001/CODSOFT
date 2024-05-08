const express = require("express")
const router = express.Router();

function Logout (req, res) {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
        console.log("User Logged out")
    } catch (error) {
        console.log("Error in logout contoller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}
module.exports = Logout;
