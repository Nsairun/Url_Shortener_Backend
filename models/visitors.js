const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require(".");

const Visitor = sequelize.define(
  "Visitor",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    time_clicked: {
        type: DataTypes.DATE,
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamp: true,
    paranoid: true,
  }
);

module.exports = Visitor;
