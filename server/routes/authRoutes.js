const express = require("express");
const CreateUsers = require("../controllers/users.controller");
const Signup = require("../controllers/signup.auth");
const Login = require("../controllers/auth.controller");
const Logout = require("../controllers/logout");


const router = express.Router();

router.post("/signup", Signup);
router.post("/user/create", Signup);
router.post("/login", Login);
router.post("/logout", Logout);




/*
router.post("/logout", logout);*/

module.exports = router;