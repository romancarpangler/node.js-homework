const express = require("express");
const router = express.Router();

const validUser = require("../../middlewares/validateUser");
const user = require("../../controlers/user");
const authenticate = require("../../middlewares/authenticate");

const vu = validUser.validateUser;

router.post("/register", vu, user.registerUser);

router.post("/login", vu, user.loginUser);

router.get("/current", authenticate, user.currentUser);

router.post("/logout", authenticate, user.logoutUser);

module.exports = router;
