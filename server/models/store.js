const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Store = sequelize.define("store", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  idno: {
    type: DataTypes.NUMBER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Store;
