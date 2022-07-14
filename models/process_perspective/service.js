const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('service', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING(255), // contract_work_order | purchase_order | scheduling
            allowNull: false
        },
        url: {
            type: DataTypes.STRING(255), 
            allowNull: false
        },
        supplier_id: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'service',
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
                name: "supplier_id",
                using: "BTREE",
                fields: [
                    { name: "supplier_id" },
                ]
            },
        ]
    });
};
