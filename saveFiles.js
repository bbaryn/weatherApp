const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-weather-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-weather-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  notes.push(note);
  saveNotes(notes);
  return note;
};

var logNote = (note) => {
  console.log('---');
  console.log(`Place: ${note.title}`);
  console.log(`Temperature: ${note.body}`);
};

module.exports = {
  addNote,
  logNote
};
