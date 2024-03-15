// sequelize.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fertilizers", "root", "Password123#@!", {
  host: process.env.SQL_DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;
