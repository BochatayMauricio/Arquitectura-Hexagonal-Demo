"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
const dbConnection_1 = require("../../Shared/DB/dbConnection");
const sequelize_1 = require("sequelize");
exports.Images = dbConnection_1.sequelize.define('images', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
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
