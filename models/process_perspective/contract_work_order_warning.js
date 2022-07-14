const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contract_work_order_warning', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        end_date_scheduled: {
            type: DataTypes.DATE, // Date (“GG/MM/AAAA”)
            allowNull: false
        },
        end_date_effective: {
            type: DataTypes.DATE,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE, //DateTime (“GG/MM/AAAA hh.mm.ss”)
            allowNull: false
        },
        contract_work_order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'contract_work_order_warning',
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
                name: "contract_work_order_id",
                using: "BTREE",
                fields: [
                    { name: "contract_work_order_id" },
                ]
            },
        ]
    });
};
