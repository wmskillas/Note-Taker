const path = require("path");
const router = require("express").Router();

router.get("/notes", (req, res) => {
  return res.json("./public/notes.html");
});

router.get("/", (req, res) => {
  return res.json("../public/index.html");
});

module.exports = router;
