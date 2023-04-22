const Sequelize = require("sequelize");
console.log('this proccess \n \n', process.env.DATABASE_NAME, '\n \n')
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: "mysql",
    host: process.env.DATABASE_HOST,
});

module.exports = sequelize;