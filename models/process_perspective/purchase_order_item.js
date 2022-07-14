const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('purchase_order_item', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        purchase_order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mbom_partcode_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'purchase_order_item',
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
                name: "purchase_order_id",
                using: "BTREE",
                fields: [
                    { name: "purchase_order_id" },
                ]
            },
            {
                name: "mbom_partcode_id",
                using: "BTREE",
                fields: [
                    { name: "mbom_partcode_id" },
                ]
            },
        ]
    });
};
