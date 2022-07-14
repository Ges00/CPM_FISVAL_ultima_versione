const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('configuration_parameter', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        parameter_name: {
            type: DataTypes.STRING(255), // Date (“GG/MM/AAAA”)
            allowNull: false
        },
        parameter_value: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'configuration_parameter',
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
        ]
    });
};
