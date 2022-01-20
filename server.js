// required packages
const express = require("express");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

// routes
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));
app.get("/api/notes", (req, res) => { res.json(notesDB)});

// wildcard route
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// port listener
app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`));