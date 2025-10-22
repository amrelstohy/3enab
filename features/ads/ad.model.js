const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let isActive = process.env.NODE_ENV === "production" ? false : true;

const adSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    imagePath: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: isActive,
    },
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", adSchema);
module.exports = Ad;
