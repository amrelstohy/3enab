const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let isActive = process.env.NODE_ENV === "production" ? false : true;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
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

categorySchema.index({ vendor: 1, isActive: 1, order: 1 });
categorySchema.index({ vendor: 1, order: 1 });

module.exports = mongoose.model("Category", categorySchema);
