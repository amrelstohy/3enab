const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const versionSchema = new Schema({
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