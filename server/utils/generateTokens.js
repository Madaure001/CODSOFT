const jwt = require('jsonwebtoken');

function generateTokenAndSetCookie (userId, res) {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {  //the secret is used to sign the token
        expiresIn: "20d"
    })
    res.cookie("jwt", token, {
        maxAge: 20 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true,         //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",     //CRSF attacks cross-site request forgery attacks
        //secure: process.env.NODE_ENV !== "development"
    });
    return token;

};

module.exports = generateTokenAndSetCookie;