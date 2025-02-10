"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const dbConnection_1 = require("../../Shared/DB/dbConnection");
const sequelize_1 = require("sequelize");
const Reparation_1 = require("./Reparation");
const Vehicle = dbConnection_1.sequelize.define('vehicles', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idClient: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    model: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    color: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    patent: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    year: {
        type: sequelize_1.DataTypes.INTEGER,
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
exports.Vehicle = Vehicle;
Vehicle.hasMany(Reparation_1.Reparation, { foreignKey: 'idVehicle', sourceKey: 'id' });
Reparation_1.Reparation.belongsTo(Vehicle, { foreignKey: 'idVehicle', targetKey: 'id' });
