const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('mbom', {
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
        project_code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        approved_by: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        last_update: {
            type: DataTypes.DATE, // DateTime (“GG/MM/AAAA hh.mm.ss”) formato che dovrebbe avere, controllare definizione corretta
            allowNull: false
        },
        mod_from: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'mbom',
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
        ]
    });
};
