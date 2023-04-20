const User = require('./userModel')
const Url = require('./urlModel')


const sequelize = require('.');

function relate() {

    sequelize.sync();

    User.hasMany(Url);
    Url.belongsTo(User);

    sequelize.sync();
}

module.exports = relate