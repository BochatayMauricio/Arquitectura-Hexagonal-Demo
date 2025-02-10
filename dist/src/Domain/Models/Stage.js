"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const dbConnection_1 = require("../../Shared/DB/dbConnection");
const sequelize_1 = require("sequelize");
const Images_1 = require("./Images");
const Stage = dbConnection_1.sequelize.define('stages', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idReparation: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    exit_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    time_permanency: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    observations: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
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
exports.Stage = Stage;
Stage.hasMany(Images_1.Images, { foreignKey: 'idStage', sourceKey: 'id' });
Images_1.Images.belongsTo(Stage, { foreignKey: 'idStage', targetKey: 'id' });
