const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const app = express();
const PORT = process.env.PORT || 9090;

let json = fs.readFileSync(
  `${__dirname}/Develop/db/db.json`,
  { encoding: "utf-8" },
  (err) => {
    if (err) throw err;
  }
);

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
  let dbData = JSON.parse(json);
  data.id = uniqid();
  const notes = JSON.stringify([...dbData, data]);

  fs.writeFileSync(`${__dirname}/Develop/db/db.json`, notes, (err) => {
    if (err) throw err;
  });
  json = fs.readFileSync(
    `${__dirname}/Develop/db/db.json`,
    { encoding: "utf-8" },
    (err) => {
      if (err) throw err;
    }
  );
  res.send();
});

// handles the rendering of the notes on the notes.html
app.get("/api/notes", (req, res) => {
  res.send(json);
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server live: http://localhost:${PORT}`);
});
