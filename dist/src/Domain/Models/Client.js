"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../../Shared/DB/dbConnection");
const sequelize_1 = require("sequelize");
const Vehicle_1 = require("./Vehicle");
const Client = dbConnection_1.sequelize.define('clients', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    surname: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    telephone: {
        type: sequelize_1.DataTypes.STRING(64),
        allowNull: false
    },
    dni: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    observations: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
Client.hasMany(Vehicle_1.Vehicle, { foreignKey: 'idClient', sourceKey: 'id' });
Vehicle_1.Vehicle.belongsTo(Client, { foreignKey: 'idClient', targetKey: 'id' });
exports.default = Client;
