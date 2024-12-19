var Sequence = require("../models/sequence");

var maxEntryId;
var sequenceId = null;
console.log("Sequence model", Sequence);
function SequenceGenerator() {
  Sequence.findOne()
    .exec()
    .then((sequence) => {
      sequenceId = sequence._id;
      maxEntryId = sequence.maxEntryId;
      console.log(sequence);
    })
    .catch((err) => {
      // return res.status(500).json({
      //   title: "An error occurred",
      //   error: err,
      // });
      console.log("An error occurred", err);
    });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "entries":
      maxEntryId++;
      updateObject = { maxEntryId: maxEntryId };
      nextId = maxEntryId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }).catch(
    (err) => {
      console.log("nextId error = " + err);
      return null;
    }
  );

  return nextId;
};

module.exports = new SequenceGenerator();
