import { sequelize } from "../../Shared/DB/dbConnection";
import { DataTypes } from "sequelize";

export const Payment = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idReparation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    method:{ //[efectivo,debito,credito]
        type: DataTypes.STRING(12),
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