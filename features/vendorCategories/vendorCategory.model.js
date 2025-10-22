const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let isActive = process.env.NODE_ENV === "production" ? false : true;

const vendorCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: isActive,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

vendorCategorySchema.index({ isActive: 1, order: 1 });

const VendorCategory = mongoose.model("VendorCategory", vendorCategorySchema);

module.exports = VendorCategory;
