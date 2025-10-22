const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rateSchema = new Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

rateSchema.index({ vendor: 1, createdAt: -1 });
rateSchema.index({ user: 1, vendor: 1 }, { unique: true });

async function updateVendorAverage(vendorId) {
  const stats = await mongoose.model("Rate").aggregate([
    { $match: { vendor: new mongoose.Types.ObjectId(vendorId) } },
    {
      $group: {
        _id: "$vendor",
        averageRate: { $avg: "$rate" },
        totalRates: { $sum: 1 },
      },
    },
  ]);

  const { averageRate = 0, totalRates = 0 } = stats[0] || {};
  await Vendor.findByIdAndUpdate(vendorId, { averageRate, totalRates });
}

rateSchema.post("save", async function () {
  await updateVendorAverage(this.vendor);
});

rateSchema.post("findOneAndDelete", async function (doc) {
  if (doc) await updateVendorAverage(doc.vendor);
});

rateSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    if (this.vendor) await updateVendorAverage(this.vendor);
  }
);

rateSchema.post("deleteOne", { query: true }, async function () {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) await updateVendorAverage(doc.vendor);
});

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;
