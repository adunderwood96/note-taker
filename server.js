// Required 
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
var notesDB = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000 ; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")));
