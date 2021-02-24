const express = require("express");
const apiRouting = require(`./Develop/routing/apiRoutes`);

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static(`${__dirname}/Develop/public`));

apiRouting.route(app);
require("./Develop/routing/htmlRoutes")(app);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server live: http://localhost:${PORT}`);
});

apiRouting.setDB();