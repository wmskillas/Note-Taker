const router = require("express").Router();
const notes = require("../db/notes");

//see all the notes that are already made
router.get("/notes", (req, res) => {
  notes
    .getNotes()
    .then((note) => {
      return res.json(note);
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
});

//create and post a new note onto the page
router.post("/notes", (req, res) => {
  notes
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => {
      return res.status(404).json("Something Went Wrong Try Again");
    });
});

//search for a note by id and delete the note from there
router.delete("/notes/:id", (req, res) => {
  notes
    .removeNote(req.params.id)
    .then(() => res.json)
    .catch((err) => {
      return res.status(404).json("Something Went Wrong Try Again");
    });
});

module.exports = router;
