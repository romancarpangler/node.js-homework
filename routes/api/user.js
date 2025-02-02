const express = require("express");
const router = express.Router();

const validUser = require("../../middlewares/validateUser");
const user = require("../../controlers/user");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const { verify } = require("../../middlewares/repeadVerifay");

const vu = validUser.validateUser;

router.post("/register", vu, user.registerUser);

router.get("/verify/:verificationToken", user.verifyUser);

router.post("/verify", verify, user.repeatedVerify);

router.post("/login", vu, user.loginUser);

router.get("/current", authenticate, user.currentUser);

router.post("/logout", authenticate, user.logoutUser);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  user.changeAvatar
);

module.exports = router;
