const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

var validateUsername = function(username) {
  var re = /^[a-zA-Z0-9]+$/;
  return re.test(username)
};

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      password: {
        type: String,
        required: true,
      },
      resetPasswordToken: String,
      resetPasswordExpires: Date,
      type: {
        type: String,
        enum: ["recruiter", "applicant"],
        required: true,
      },
      username: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Username  is required',
        validate: [validateUsername, 'Please fill a valid username'],
        match: [/^[a-zA-Z0-9]+$/, 'Please fill a valid eusername']
      }
    },
    { collation: { locale: "en" } },
  
    //createdAt, updatedAt => Member since <createdAt> 
    {timestamps: true}
);
// Password hashing
userSchema.pre("save", function (next) {
  let user = this;

  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// Password verification upon login
userSchema.methods.login = function (password) {
  let user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

module.exports =  mongoose.model("UserAuth", userSchema);