const util = require("util");
const fs = require("fs");
const uuid = require("uuid");

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);
class Notes {
  write(note) {
    return writeNote("/db/db.json", JSON.stringify(note));
  }

  read() {
    return readNote("db/db.json", "utf8");
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNotes(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error(`Please enter a "title" and "text"`);
    }
    const newNotes = { title, text, id: uuid() };

    return this.getNotes()
      .then((notes) => [...notes, newNotes])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNotes);
  }

  deleteNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filterNotes) => this.write(filterNotes));
  }
}

module.exports = new Notes();
