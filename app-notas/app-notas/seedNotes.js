const Notes = require('./database');
const notesJSON = require('./notes');
const notes = JSON.parse(notesJSON);

async function seedNotesToDatabase() {
    const notesToSave = [];

    for (const note of notes) {
        const newNote = new Notes({
            title: note.title,
            description: note.description
    });

    notesToSave.push(newNote);
  }
  await Notes.bulkSave(notesToSave);
}

seedNotesToDatabase();