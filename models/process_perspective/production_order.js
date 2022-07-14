const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('production_order', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mbom_partcode_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        odp_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        odp_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        odp_status: {
            type: DataTypes.INTEGER, // da 0 a 7 compresi
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'production_order',
        timestamps: false,
        freezeTableName: true,
        indexes: [{
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "mbom_partcode_id",
                using: "BTREE",
                fields: [
                    { name: "mbom_partcode_id" },
                ]
            },
            {
                name: "client_id",
                using: "BTREE",
                fields: [
                    { name: "client_id" },
                ]
            },
        ]
    });
};