const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const versionSchema = new Schema({
  appType: {
    type: String,
    enum: ["user", "vendor", "admin", "delivery"],
    required: true,
  },
  platform: {
    type: String,
    enum: ["android", "ios"],
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  minVersion: {
    type: String,
    required: true,
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;