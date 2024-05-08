var express = require("express");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developerthulani@gmail.com',
    pass: 'developer654321'
  }
});

var mailOptions = {
  from: 'developerthulani@gmail.com',
  to: `${user.email}`,
  subject: 'Job Application Sent Successfully',
  text: `
    Hello ${user.fullName},
    Your application for ${employmentTitle} ${jobTitle} with ${companyName} based at ${jobLocation} has been sent successfully.
    Login to EazilyHired to apply for more opportunities.
    EazilyHired Team.
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});