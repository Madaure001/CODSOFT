const express = require("express");
const Signup = require("../controllers/signup.auth");
const Login = require("../controllers/auth.controller");
const Logout = require("../controllers/logout");
const Reset = require("../controllers/password.reset");
const VerifyToken = require("../controllers/token.verify");
const PasswordUpdate = require("../controllers/update.password");

const router = express.Router();

router.post("/signup", Signup);
router.post("/user/create", Signup);
router.post("/login", Login);
router.post("/logout", Logout);
router.post("/reset", Reset);
router.get("/reset/:token", VerifyToken);
router.post("/reset/:token", PasswordUpdate);

module.exports = router;