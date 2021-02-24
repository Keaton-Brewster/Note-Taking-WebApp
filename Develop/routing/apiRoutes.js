const uniqid = require("uniqid");
const jsonfile = require("jsonfile");

const setDB = () => {
  db = jsonfile.readFileSync(
    `${__dirname}/../db/db.json`, {
      encoding: "utf-8"
    },
    (err) => {
      if (err) throw err;
    }
  );
};

module.exports = apiRouting = {
  setDB: setDB,
  route: (app) => {
    // handles the saving of a note from notes.html
    app.post("/api/notes", (req, res) => {
      const data = req.body;
      data.id = uniqid();
      const notes = [...db, data];

      jsonfile.writeFileSync(`${__dirname}/../db/db.json`, notes, (err) => {
        if (err) throw err;
      });
      setDB();
      res.end();
    });

    // handles the deletion of notes from the notes.html
    app.delete("/api/notes/:deleteID", (req, res) => {
      const delID = req.params.deleteID;
      const filteredDB = db.filter((note) => {
        return note.id !== delID;
      });
      jsonfile.writeFileSync(`${__dirname}/../db/db.json`, filteredDB, (err) => {
        if (err) throw err;
      });
      setDB();
      res.end();
    });

    // handles the rendering of the notes on the notes.html
    app.get("/api/notes", (req, res) => {
      res.send(db);
    });
  },
};