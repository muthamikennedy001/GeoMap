// user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // This is your Sequelize instance

const Distributor = sequelize.define("Distributor", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Distributor;
