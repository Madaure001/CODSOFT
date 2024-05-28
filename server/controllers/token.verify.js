const User = require('../models/User');
const express = require('express');

async function VerifyToken (req, res)  {
    console.log(req.params.token)
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({error: 'Password reset token is invalid or has expired. Request a new verification.'});
        }


        res.status(200).send({ 
            token: req.params.token,
            email: user.email
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
module.exports = VerifyToken;