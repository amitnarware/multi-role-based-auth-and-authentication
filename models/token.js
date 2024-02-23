const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Token = sequelize.define("Token", {
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('access', 'refresh'),
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

Token.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Token;
