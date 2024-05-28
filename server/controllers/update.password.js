const User = require('../models/User');
const express = require('express');
const bcrypt = require("bcrypt");

 async function PasswordUpdate (req, res) {
    console.log("we've made it here")
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({error: 'Password reset token is invalid or has expired.'});
        }

        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status.json({error: "passwords do not match"})
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        console.log("now we are here")
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({success: 'Password has been reset successfully'});
    } catch (err) {
        res.status(500).send('Server error');
    }
};
module.exports = PasswordUpdate ;