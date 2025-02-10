"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const dbConnection_1 = require("../../Shared/DB/dbConnection");
const sequelize_1 = require("sequelize");
exports.Payment = dbConnection_1.sequelize.define('payments', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idReparation: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    method: {
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
