const sequelize = require('../config/database');
const User = require('./user');
const Role = require('./role');
const Token = require('./token');

User.hasMany(Token);
Role.hasMany(User);

module.exports = { sequelize, User, Role, Token };
