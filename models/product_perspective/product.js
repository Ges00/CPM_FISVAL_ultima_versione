const Sequelize = require("sequelize");
//const sequelize = require("../database");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('product', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT(255),
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'product',
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });
};
