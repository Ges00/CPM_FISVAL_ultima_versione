const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sales_order_item', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        qty: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sales_order_id: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'sales_order_item',
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
                name: "product_id",
                using: "BTREE",
                fields: [
                    { name: "product_id" },
                ]
            },
            {
                name: "sales_order_id",
                using: "BTREE",
                fields: [
                    { name: "sales_order_id" },
                ]
            },
        ]
    });
};
