const express = require("express");
const api = require(`./Develop/routing/apiRoutes`);
const html = require("./Develop/routing/htmlRoutes")

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(`Develop/public`));

api.route(app);
html.route(app);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server live: http://localhost:${PORT}`);
});

api.setDB();