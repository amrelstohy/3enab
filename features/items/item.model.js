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

const optionSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
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
    optionType: {
      type: String,
      enum: ["none", "size", "weight"],
      default: "none",
    },
    options: {
      type: [optionSchema],
      default: [],
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

itemSchema.methods.getPrice = function (optionId = null) {
  const now = new Date();

  // no options
  if (this.optionType === "none") {
    return applyDiscount(this.basePrice, this.discount, now);
  }

  // with options → optionId is required
  const opt = this.options.id(optionId);
  if (!opt) return null;

  return applyDiscount(opt.price, this.discount, now);
};

function applyDiscount(price, discount, now) {
  if (
    discount &&
    discount.isActive &&
    discount.value > 0 &&
    (!discount.startDate || now >= discount.startDate) &&
    (!discount.endDate || now <= discount.endDate)
  ) {
    const final =
      discount.type === "percentage"
        ? price - price * (discount.value / 100)
        : price - discount.value;

    return Math.max(Number(final.toFixed(2)), 0);
  }

  return price;
}

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
