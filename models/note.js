const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    noteTitle: { type: String, required: true },
    noteText: { type: String, required: true },
    noteColor: { type: String, required: false }
});

module.exports = mongoose.model('Note', noteSchema);
