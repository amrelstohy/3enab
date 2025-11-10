const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const isActive = process.env.NODE_ENV === "production" ? false : true;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
      default: "percentage",
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscountValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: isActive,
    },
    maxUsesPerUser: {
      type: Number,
      default: 1,
      min: 1,
    },
    maxUses: {
      type: Number,
      default: 100,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    allowedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    vendors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Vendor",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.index({ vendors: 1 });
couponSchema.index({ allowedUser: 1 });

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
