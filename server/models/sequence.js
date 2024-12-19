const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
  maxEntryId: Number,
});

module.exports = mongoose.model("Sequence", sequenceSchema);
