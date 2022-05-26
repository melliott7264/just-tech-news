// dotenv facilitates the use of environment variables
require('dotenv').config();

const path = require('path');

const express = require('express');

// added for handlebars
const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});

const routes = require('./controllers');
const sequelize = require('./config/connection');

// add handlebar helpers
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

// added for express sessions
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: process.env.SESSION_SECRET,
  // secret: "This is a super secret phrase",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

const app = express();
const PORT = process.env.PORT || 3001;

// middleware for handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// required to handle data streams
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sets up a static path for html/css code to be served
app.use(express.static(path.join(__dirname, 'public')));

// middleware for express session
app.use(session(sess));

app.use(routes);

// turn on connection to database and server
// change force to true to force a database/table drop and re-creation
// make sure to change force back to false after database changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now Listening'));
});
