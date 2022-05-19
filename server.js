const express = require('express');

const routes = require('./routes');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes);

// turn on connection to database and server
// change force to true to force a database/table drop and re-creation
// make sure to change force back to false after database changes
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});
