const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

module.exports = function (app) {
    // API to send the db.json file on GET request from notes.html    
    app.get("/api/notes", function (req, res) {
        // Use fs to render notes.html
        fs.readFile("db/db.json", "utf8", function (err, log) {
            const data = JSON.parse(log)|| [];
            res.json(data);
        });
    });
    
    // API to post to db.json file on POST request from notes.html
    app.post("/api/notes", function (req, res) {
        // Use fs to render existing notes list on notes.html and...
        fs.readFile("db/db.json", "utf8", function (err, log) {
            const newData = JSON.parse(log) || [];
            console.log(newData)
            const newNote = req.body;
            
            newNote.id = uuid.v4();
            newData.push(newNote);
        
            // Use fs to render newly created notes, appended to list of existing notes on notes.html 
            fs.writeFile("db/db.json", JSON.stringify(newData), function (err) {
                if (err) throw err;
                res.json(newData);
            });
        });
    });
    
    // API to delete from db.json on DELETE request from notes.html
    app.delete("/api/notes/:id", function (req, res) {
        const id = req.params.id;
        // Use fs to render existing notes list with deleted note removed from notes.html...
        fs.readFile("db/db.json", "utf8", function (err, log) {
            const existingData = JSON.parse(log);
            const filteredNotes = existingData.filter((note) => note.id !== id);
            console.log(filteredNotes);
            // Use fs to render with selected note removed after delete from the list of existing notes on notes.html 
            fs.writeFile("db/db.json", JSON.stringify(filteredNotes), function (err) {
                if (err) throw err;
                res.json(filteredNotes);
            });
        });
    });
};