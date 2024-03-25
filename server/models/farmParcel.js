const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const FarmParcel = sequelize.define("farmParcel", {
  farmParcelId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  mapId: {
    type: DataTypes.INTEGER,
  },
  coordinates: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = FarmParcel;
