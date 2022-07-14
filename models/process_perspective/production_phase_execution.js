const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('production_phase_execution', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        production_phase_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        queue_time_before: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        setup_time: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        process_time: { 
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        process_per_qty: { 
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        trans_ptime: { 
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        queue_time_after: { 
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        to_hours: { 
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        work_center_id: { 
            type: DataTypes.INTEGER,
            allowNull: false
        },
        start_date: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: { 
            type: DataTypes.DATE,
            allowNull: false
        },
        vendor_name: { 
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'production_phase_execution',
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
                name: "production_phase_id",
                using: "BTREE",
                fields: [
                    { name: "production_phase_id" },
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
