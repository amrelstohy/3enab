const mongoose = require('mongoose');
const Counter = require('../counters/counter.model');

const orderStatus = [
  'pending',
  'preparing',
  'out_for_delivery',
  'delivered',
  'completed',
  'received_by_customer',
  'cancelled',
  'canceled_by_vendor',
];

const orderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    optionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    optionValue: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
      required: true,
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    items: {
      type: [orderItemSchema],
      validate: [(val) => val.length > 0, 'Order must have at least one item.'],
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
    deliveryFee: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    appliedCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
      default: null,
    },
    status: {
      type: String,
      enum: orderStatus,
      default: 'pending',
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'credit_card', 'wallet'],
      default: 'cash',
    },
    isPickup: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('validate', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: 'orderNumber', vendor: this.vendor },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.orderNumber = counter.seq;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = { Order, orderStatus };
