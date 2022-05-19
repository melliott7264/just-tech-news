const Sequelize = require('sequelize');

// dotenv facilitates the use of environment variables
require('dotenv').config();

// uses .env environment variables for login information to keep that information out of the code
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
