const mongoose = require("mongoose");
const { timestamp } = require("rxjs");

const entrySchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String },
    body: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Entry", entrySchema);
