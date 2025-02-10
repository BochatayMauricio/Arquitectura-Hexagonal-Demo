"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reparation = void 0;
const dbConnection_1 = require("../../Shared/DB/dbConnection");
const sequelize_1 = require("sequelize");
const Payment_1 = require("./Payment");
const Stage_1 = require("./Stage");
const Reparation = dbConnection_1.sequelize.define('reparations', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idVehicle: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: false
    },
    retired_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    time_reparation: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    total_amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    methodPayment: {
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
exports.Reparation = Reparation;
Reparation.hasMany(Payment_1.Payment, { foreignKey: 'idReparation', sourceKey: 'id' });
Payment_1.Payment.belongsTo(Reparation, { foreignKey: 'idReparation', targetKey: 'id' });
Reparation.hasMany(Stage_1.Stage, { foreignKey: 'idReparation', sourceKey: 'id' });
Stage_1.Stage.belongsTo(Reparation, { foreignKey: 'idReparation', targetKey: 'id' });
