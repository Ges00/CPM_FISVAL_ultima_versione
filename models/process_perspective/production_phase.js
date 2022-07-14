const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('production_phase', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        production_order_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        parent_production_phase_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        phase_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        operation_number: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        operation_description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        operation_number_next: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        work_center_group_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inspection: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        operation_finished: {
            type: DataTypes.INTEGER, // 0 o 1
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'production_phase',
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
                name: "production_order_id",
                using: "BTREE",
                fields: [
                    { name: "production_order_id" },
                ]
            },
            {
                name: "parent_production_phase_id",
                using: "BTREE",
                fields: [
                    { name: "parent_production_phase_id" },
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
