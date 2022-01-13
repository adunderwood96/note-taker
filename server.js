// Required 
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var notesDB = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001 ; 

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

// routes to get html/notes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));
app.get("/api/notes", (req,res) => { res.json(notesDB)});

// wildcard route
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));
