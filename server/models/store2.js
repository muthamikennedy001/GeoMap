const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Store2 = sequelize.define("Store2", {
  parcelId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  parentId: {
    type: DataTypes.INTEGER,
  },
  coordinates: {
    type: DataTypes.STRING,
  },
});

module.exports = Store2;
