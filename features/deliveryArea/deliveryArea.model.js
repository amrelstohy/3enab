const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let isActive = process.env.NODE_ENV === "production" ? false : true;

const deliveryAreaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    estimatedTime: {
      type: Number,
      default: 30,
    },
    isActive: {
      type: Boolean,
      default: isActive,
    },
  },
  { timestamps: true }
);

deliveryAreaSchema.index({ name: 1, isActive: 1 });

const DeliveryArea = mongoose.model("DeliveryArea", deliveryAreaSchema);
module.exports = DeliveryArea;
