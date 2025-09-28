const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      sparse: true,
      lowercase: true,
      unique: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    phoneVerificationOTP: {
      type: String,
    },
    phoneVerificationOTPExpires: {
      type: Date,
    },
    resetPasswordOTP: {
      type: String,
    },
    resetPasswordOTPExpires: {
      type: Date,
    },
    resetPasswordTokenExpires: {
      type: Date,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
