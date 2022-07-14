const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('resource', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT(255),
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(255),  // (“operator” | “equipment”)
            allowNull: false
        },
        work_center_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'resource',
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
            {
                name: "work_center_id",
                using: "BTREE",
                fields: [
                    { name: "work_center_id" },
                ]
            },
        ]
    });
};
