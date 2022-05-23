const path = require("path");

const express = require("express");

// added for handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

//added for handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// required to handle data streams
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets up a static path for html/css code to be served
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// turn on connection to database and server
// change force to true to force a database/table drop and re-creation
// make sure to change force back to false after database changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});
