const path = require('path');

// Exporting routes so they can be pulled in on the server
module.exports = function (app) {
    // GET request handler for *
    app.get('/', function (req, res) {
    // variable for file location
    const index = '../public/index.html';
    // Response: Loads the index.html
    res.sendFile(path.join(__dirname, index));
});
// GET request handler for /notes
    app.get('/notes', function (req, res) {
    // variable for file location
    const notes = '../public/notes.html';
    // Response: Loads the notes.html
    res.sendFile(path.join(__dirname, notes));
  });
};