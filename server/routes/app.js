var path = require("path");
var express = require("express");
var router = express.Router();

/* GET home page. */
const rootDir = process.cwd();
console.log(process.cwd());
router.get("/", function (req, res, next) {
  res.sendFile(path.join(rootDir, "dist/journal/browser/index.html"));
});

module.exports = router;
