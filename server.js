const express = require("express");
const fs = require("fs");
const path = require("path");
let db = require("./Develop/db/db.json");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/Develop/public`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

// handles the saving of a note from notes.html
app.post("/api/notes", (req, res) => {
  const data = req.body;
  data.id = uniqid();
  const notes = JSON.stringify([...db, data]);

  fs.writeFile(`${__dirname}/Develop/db/db.json`, notes, (err) => {
    if (err) throw err;
  });
  res.send();
});

// handles the rendering of the notes on the notes.html
app.get("/api/notes", (req, res) => {
  res.send(db);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server live: http://localhost:${PORT}`);
});
