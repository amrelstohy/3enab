const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let isActive = process.env.NODE_ENV === "production" ? false : true;

const vendorTypes = [
  "restaurant",
  "cafe",
  "bar",
  "grocery",
  "supermarket",
  "other",
];

const workingHoursSchema = new Schema(
  {
    open: {
      type: String,
      default: "09:00",
    },
    close: {
      type: String,
      default: "21:00",
    },
    days: {
      type: [String],
      default: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  },
  { _id: false }
);

const vendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logoPath: {
      type: String,
      default: null,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorCategory",
      required: true,
    },
    workingHours: {
      type: workingHoursSchema,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: isActive,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    averageRate: { type: Number, default: 0 },
    totalRates: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

vendorSchema.index({ isActive: 1, type: 1, createdAt: -1 });

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
