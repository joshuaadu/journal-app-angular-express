var express = require("express");
const sequenceGenerator = require("./sequenceGenerator");
const Entry = require("../models/entry");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    // call the Entry model find() method to get all entries in the collection
    const entries = await Entry.find();

    res.status(200).json(entries);
  } catch (error) {
    console.log("Fetching entries failed:", error);
    // res.status(500).send("failed to fetch entries");
    res.status(500).json({
      entry: "failed to fetch entries",
      error: error,
    });
  }
});

router.post("/", (req, res, next) => {
  const maxEntryId = sequenceGenerator.nextId("entries");
  console.log(req.body);

  const entry = new Entry({
    id: maxEntryId,
    title: req.body?.title,
    body: req.body?.body,
  });

  entry
    .save()
    .then((createdEntry) => {
      res.status(201).json({
        entry: "Entry added successfully",
        entryData: createdEntry,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        entry: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Entry.findOne({ id: req.params.id })
    .then((entry) => {
      entry.title = req.body?.title;
      entry.body = req.body?.body;

      Entry.updateOne({ id: req.params.id }, entry)
        .then((result) => {
          res.status(204).json({
            entry: "Entry updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            entry: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        entry: "Entry not found.",
        error: { entry: "Entry not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Entry.findOne({ id: req.params.id })
    .then((entry) => {
      Entry.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            entry: "Entry deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            entry: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        entry: "Entry not found.",
        error: { entry: "Entry not found" },
      });
    });
});

module.exports = router;
