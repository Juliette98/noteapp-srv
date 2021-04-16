const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Note = require('./models/note');
mongoose.connect('mongodb+srv://noteapp:noteapp@cluster0.dzqqp.mongodb.net/noteapp?retryWrites=true&w=majority')
    .then(() =>{
        console.log("Successfully connected to DB!");
    })
    .catch((error) => {
       console.log("Unable to connect to DB!");
    });

app.use((req, res, next) => {
   res.set('Access-Control-Allow-Origin', '*');
   res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   res.set('Access-Control-Allow-Credentials', true);
   next();
});

/*app.use((req, res, next) => {
   next();
});*/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//GET /notes
app.get('/notes', (request, response) =>{
   Note.find((error, notes) => {
      if (error) return console.error(err);
      response.json(notes);
   });
});

//GET /notes/:id
app.get('/notes/:id', (request, response) =>{
   console.log(request.params.id);
   Note.findOne( { _id: request.params.id }, (error, note) => {
      if (error) {
         return response.status(404).json({error: error});
      }
      response.status(200).json(note);
   });
});

//POST /notes
app.post('/notes', (request, response) =>{
   let requestNote = request.body;
   let newNote = new Note({
      noteTitle: requestNote.noteTitle,
      noteText: requestNote.noteText,
      noteColor: requestNote.noteText
   });
   newNote.save((error, note) => {
      if (error) return console.error(err);
      console.log(note);
      response.json(note);
   })
});

//PUT /notes/:id
app.put('/notes/:id', (request, response) =>{
   let requestNote = request.body;
   let newNote = new Note({
      _id: request.params.id,
      noteTitle: requestNote.noteTitle,
      noteText: requestNote.noteText,
      noteColor: requestNote.noteText
   });
   Note.updateOne({_id:request.params.id}, newNote, (error, note) => {
      if (error) return response.status(400).json({error:error});
      response.status(201).json(note);
   });
});

//DELETE /notes/:id
app.delete('/notes/:id', (request, response) =>{
   Note.deleteOne({_id: request.params.id}, (error) => {
      if (error) return response.status(400).json({error:error});
      response.status(201).json({msg:'ok'});
   });
});

app.listen(3000, ()=>{console.log("Listening on port 3000")});
