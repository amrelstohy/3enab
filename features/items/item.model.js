const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    status: {
      type: String,
      enum: ["active", "inactive", "available", "unavailable"],
      default: "available",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

itemSchema.index({ category: 1, status: 1, order: 1 });

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
