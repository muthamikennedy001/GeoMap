const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const SoilData = sequelize.define("soilData", {
  soilDataId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  farmParcelId: {
    type: DataTypes.INTEGER,
  },
  Temperature: {
    type: DataTypes.DECIMAL,
  },
  Humidity: {
    type: DataTypes.DECIMAL,
  },
  SoilType: {
    type: DataTypes.STRING,
  },
  pH: {
    type: DataTypes.DECIMAL,
  },
  NitrogenLevel: {
    type: DataTypes.DECIMAL,
  },
  PotassiumLevel: {
    type: DataTypes.DECIMAL,
  },
  phosphorusLevel: {
    type: DataTypes.DECIMAL,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = SoilData;
