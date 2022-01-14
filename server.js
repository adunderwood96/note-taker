// Required packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
var notesData = require("./db/db.json");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));

// routes to get html/notes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".public/index.html"))
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, ".public/notes.html"))
});

app.get("/api/notes", (req, res) => {
  res.json(notesData)
});

// wildcard route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

// new note
app.post("/api/notes", (req, res) => {
  req.body.id = uuid.v4();
  const newNote = req.body;

  notesData.push(newNote);

  // note to file
  fs.writeFileSync(".db/db.json", JSON.stringify(notesData));
  res.json(notesData);
});

// ability to delete notes
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  notesData = notesData.filter(notes => notes.id !== id);

  fs.writeFileSync(".db/db.json", JSON.stringify(notesData));
  res.json(notesData);
});

// API Port listener 
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});