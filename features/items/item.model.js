const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let isActive = process.env.NODE_ENV === "production" ? false : true;
let isAvailable = process.env.NODE_ENV === "production" ? false : true;

const discountSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    value: {
      type: Number,
      default: 0,
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
      default: false,
    },
  },
  { _id: false }
);

const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: discountSchema,
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
    isAvailable: {
      type: Boolean,
      default: isAvailable,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuCategory",
      required: true,
    },
    prepTime: {
      type: String,
      default: null,
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

itemSchema.index({ category: 1, isActive: 1, order: 1 });

itemSchema.methods.getFinalPrice = function () {
  const now = new Date();
  const { basePrice, discount } = this;

  if (
    discount &&
    discount.isActive &&
    discount.value > 0 &&
    (!discount.startDate || now >= discount.startDate) &&
    (!discount.endDate || now <= discount.endDate)
  ) {
    const finalPrice =
      discount.type === "percentage"
        ? basePrice - basePrice * (discount.value / 100)
        : basePrice - discount.value;
    return Math.max(Number(finalPrice.toFixed(2)), 0);
  }

  return basePrice;
};

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
