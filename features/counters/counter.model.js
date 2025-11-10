const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["orderNumber"],
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  seq: { type: Number, default: 0 },
});

counterSchema.index({ name: 1, vendor: 1 }, { unique: true });

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
