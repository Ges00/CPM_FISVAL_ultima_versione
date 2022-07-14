const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('work_center_group', {
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
        parent_work_center_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        work_center_group_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'work_center_group',
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
                name: "parent_work_center_id",
                using: "BTREE",
                fields: [
                    { name: "parent_work_center_id" },
                ]
            },
            {
                name: "work_center_group_id",
                using: "BTREE",
                fields: [
                    { name: "work_center_group_id" },
                ]
            },
        ]
    });
};
