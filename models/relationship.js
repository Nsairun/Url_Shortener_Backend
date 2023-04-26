const User = require('./userModel')
const Url = require('./urlModel')
const Visitor = require('./visitors')


const sequelize = require('.');

function relate() {

    sequelize.sync();

    User.hasMany(Url);
    Url.belongsTo(User);

    Url.hasMany(Visitor);
    Visitor.belongsTo(Url)

    sequelize.sync();
}

module.exports = relate