// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

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

//Routes API
app.get("/api/tables", function (req, res) {
  return res.json(JSON.parse(fs.readFileSync("db/table.json")));
});
app.get("/api/waitlist", function (req, res) {
  return res.json(JSON.parse(fs.readFileSync("db/waitlist.json")));
});

//POST
app.post("/api/tables", function (req, res) {
  if (tables.length < 5) {
    tables.push(req.body);
    fs.writeFileSync("db/table.json", JSON.stringify(tables));
    res.json(true);
  } else {
    waitlist.push(req.body);
    fs.writeFileSync("db/waitlist.json", JSON.stringify(waitlist));
    res.json(false);
  }
});

//DELETE
app.post("/api/clear", function (req, res) {
  tables = [];
  waitlist = [];
  fs.writeFileSync("db/table.json", JSON.stringify(tables));
  fs.writeFileSync("db/waitlist.json", JSON.stringify(waitlist));
  res.json(true);
});
//Listen
app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
