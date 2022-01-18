// Required packages
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/public"));

// routes to note api and html files
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// wildcard route
app.get("*", (req, res) => {
  res.sendFile("/public/index.html")
});

// API Port listener 
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});