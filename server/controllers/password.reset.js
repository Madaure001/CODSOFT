const express = require('express');
const User = require('../models/User'); 
const crypto = require('crypto');
const nodemailer = require('nodemailer');

async function Reset  (req, res) {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            console.log("could not find user")
            return res.status(400).json({error: "email does not exist"});
        }

        const token = crypto.randomBytes(20).toString('hex');

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: `${process.env.EMAIL}`,
                pass:  `${process.env.PASS}`
            }
        });
        console.log(req.headers)
        const mailOptions = {
            to: user.email,
            from: 'passwordreset@demo.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.origin}/reset/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('There was an error: ', err);
            } else {
                res.status(200).json({success: "Recovery email sent successfully"});
            }
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
module.exports = Reset;



