const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = require("./role");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
