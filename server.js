// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Arrays for table,
var tables = [];
var waitlist = [];

//Routes html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "reserve.html"));
});
app.get("/table", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "table.html"));
});
