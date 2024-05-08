const passport = require("passport");
const Strategy = require("passport-local").Strategy;
require("dotenv").config();

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


const authKeys = require("./authKeys");
const User = require("../models/User");

const filterJson = (obj, unwantedKeys) => {
  const allOptions = {};
  Object.keys(obj).forEach((key) => {
    if (unwantedKeys.indexOf(key) === -1) {
      allOptions[key] = obj[key];
    }
  });
  return allOptions;
};
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = authKeys.jwtSecretKey;

passport.use(
  new JwtStrategy( opts, async function (jwt_payload, done) {
    //console.log(jwt_payload)
    try {
      const user = await User.findById(jwt_payload._id)

      if(!user) {
        return done(null, false, {
          message: "JWT Token does not exist",
        });
      }
      //console.log(Object.keys(jwt_payload));
      
      user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
      //console.log(user)
      return done(null, user);
      //console.log(Object.keys(jwt_payload));

    } catch (error) {
      return done(error, false);
    }
      

      /*if(!user) {
        return done
      }
        .then((user) => {
          console.log(Object.keys(jwt_payload));
          if (!user) {
            return done(null, false, {
              message: "JWT Token does not exist",
            });
          }
          user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Incorrect Token",
          });
        });*/
    }
  )
);

module.exports = passport;
