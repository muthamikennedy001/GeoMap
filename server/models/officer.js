// user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // This is your Sequelize instance

const Officer = sequelize.define("Officer", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  idno: {
    type: DataTypes.NUMBER,
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

module.exports = Officer;
