const Sequelize = require("sequelize");
//const sequelize = require("../database");

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('client', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'client',
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
