const express = require("express");
const jsonfile = require("jsonfile");
const path = require("path");
const uniqid = require("uniqid");
var db;

const app = express();
const PORT = process.env.PORT || 9090;

const setDB = function () {
  db = jsonfile.readFileSync(
    `${__dirname}/Develop/db/db.json`,
    { encoding: "utf-8" },
    (err) => {
      if (err) throw err;
    }
  );
};

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
  let dbData = db;
  data.id = uniqid();
  const notes = [...dbData, data];

  jsonfile.writeFileSync(`${__dirname}/Develop/db/db.json`, notes, (err) => {
    if (err) throw err;
  });
  setDB();
  res.end();
});

// handles the deletion of notes from the notes.html
app.delete("/api/notes/:deleteID", (req, res) => {
  const delID = req.params.deleteID.toString();
  const filterdDB = db.filter((note) => {
    return note.id.toString() !== delID;
  });
  jsonfile.writeFileSync(
    `${__dirname}/Develop/db/db.json`,
    filterdDB,
    (err) => {
      if (err) throw err;
    }
  );
  setDB();
  res.end();
});

// handles the rendering of the notes on the notes.html
app.get("/api/notes", (req, res) => {
  res.send(db);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server live: http://localhost:${PORT}`);
});

setDB();
