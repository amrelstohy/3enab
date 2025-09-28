const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const resetPassMiddleware = require("../../middlewares/resetPass.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);

router.post(
  "/send-email-verification-mail",
  authMiddleware,
  authController.sendEmailVerificationMail
);
router.get("/verify-email", authMiddleware, authController.verifyEmail);

router.post("/send-phone-otp", authMiddleware, authController.sendPhoneOtp);
router.post("/verify-phone-otp", authMiddleware, authController.verifyPhoneOtp);

router.post("/send-reset-password-otp", authController.sendResetPasswordOtp);
router.post(
  "/verify-reset-password-otp",
  authController.verifyResetPasswordOtp
);
router.post(
  "/reset-password",
  resetPassMiddleware,
  authController.resetPassword
);

router.post("/refresh-token", authController.refreshToken);

module.exports = router;
