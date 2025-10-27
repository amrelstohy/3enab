const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("../orders/order.model");

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
      default: true,
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
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
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

couponSchema.index({ code: 1 });
couponSchema.index({ vendors: 1 });
couponSchema.index({ allowedUsers: 1 });

// method to check if the coupon is valid.
couponSchema.methods.isValidForUser = async function (userId, vendorId) {
  const now = new Date();
  const usedCountByUser = await Order.countDocuments({
    coupon: this._id,
    user: userId,
  });
  if (!this.isActive) {
    throw new Error("Coupon is not active");
  }
  if (this.startDate && now < this.startDate) {
    throw new Error("Coupon is not valid, start date is not yet reached");
  }
  if (this.endDate && now > this.endDate) {
    throw new Error("Coupon is not valid, end date is already passed");
  }
  if (this.maxUses && this.usedCount >= this.maxUses) {
    throw new Error("Coupon is not valid, max uses is already reached");
  }
  if (
    this.allowedUsers?.length &&
    !this.allowedUsers.some((u) => u.toString() === userId.toString())
  ) {
    throw new Error(
      "Coupon is not valid, user is not allowed to use this coupon"
    );
  }
  if (this.maxUsesPerUser && usedCountByUser >= this.maxUsesPerUser) {
    throw new Error("Coupon is not valid, user has already used this coupon");
  }
  if (
    this.vendors?.length &&
    !this.vendors.some((v) => v.toString() === vendorId.toString())
  ) {
    throw new Error(
      "Coupon is not valid, vendor is not allowed to use this coupon"
    );
  }
  return true;
};

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
