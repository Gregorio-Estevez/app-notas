const Notes = require("./database");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");
const notesJSON = fs.readFileSync(path.join(__dirname, "notes.json"));
const notes = JSON.parse(notesJSON);

async function seedNotesToDatabase() {
  const notesToSave = [];
  for (const note of notes) {
    const newNote = new Notes({
      title: note.title,
      description: note.description,
    });
    notesToSave.push(newNote);
  }
  await Notes.bulkSave(notesToSave);
  exit();
}

seedNotesToDatabase();
