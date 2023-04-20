const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require(".");

const Url = sequelize.define(
  "Url",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clicks: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamp: true,
    paranoid: true,
  }
);

module.exports = Url;
