const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('mbom_partcode', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        mbom_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        M_b: { // dovrebbe essere M/b ma non posso definirla cosi in nodejs
            type: DataTypes.STRING(255),
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pos: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        um: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT(255),
            allowNull: false
        },
        Fan: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        project_pos: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        serial: {
            type: DataTypes.STRING(255), // Derivato | Nuovo | Nessuno
            allowNull: true
        },
        project_stock: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        note: {
            type: DataTypes.TEXT(255),
            allowNull: true
        },
        primary: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {
        sequelize,
        tableName: 'mbom_partcode',
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
                name: "mbom_id",
                using: "BTREE",
                fields: [
                    { name: "mbom_id" },
                ]
            },
            // come può avere una chiave esterna che non esiste tra gli attributi dell'entità
            {
                name: "parent_partcode_id",
                using: "BTREE",
                fields: [
                    { name: "parent_partcode_id" },
                ]
            },
        ]
    });
};