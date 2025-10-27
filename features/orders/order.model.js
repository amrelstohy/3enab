const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      validate: [(val) => val.length > 0, "Order must have at least one item."],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    appliedCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "wallet"],
      default: "cash",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.methods.calculateTotals = async function () {
  // populate items for price if needed
  if (!this.items || !this.items.length)
    throw new Error("Cannot calculate totals for empty order.");

  const subtotal = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  this.subtotal = subtotal;
  this.total = subtotal - (this.discount || 0);
  if (this.total < 0) this.total = 0;

  return this.total;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
