const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contract_work_order', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        supplier_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        production_phase_execution_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    }, {
        sequelize,
        tableName: 'contract_work_order',
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
            {
                name: "production_phase_execution_id",
                using: "BTREE",
                fields: [
                    { name: "production_phase_execution_id" },
                ]
            },
        ]
    });
};
