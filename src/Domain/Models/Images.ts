import { sequelize } from "../../Shared/DB/dbConnection";
import { DataTypes } from "sequelize";

export const Images = sequelize.define('images', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idStage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});