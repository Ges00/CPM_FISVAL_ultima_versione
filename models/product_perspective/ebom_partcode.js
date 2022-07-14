const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ebom_partcode', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        ebom_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        code: {
            type: DataTypes.STRING(255),
            allowNull: false    
        },
        description: {
            type: DataTypes.TEXT(255),
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'ebom_partcode',
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
                name: "ebom_id",
                using: "BTREE",
                fields: [
                    { name: "ebom_id" },
                ]
            },
        ]
    });
};
