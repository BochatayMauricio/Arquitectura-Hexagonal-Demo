import { sequelize } from "../../Shared/DB/dbConnection";
import { DataTypes } from "sequelize";
import { Payment } from "./Payment";
import { Stage } from "./Stage";

const Reparation = sequelize.define('reparations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idVehicle: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(12),
        allowNull: false
    },
    retired_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time_reparation:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    methodPayment:{//[Cuotas,contado]
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

Reparation.hasMany(Payment, {foreignKey: 'idReparation', sourceKey: 'id'});
Payment.belongsTo(Reparation, {foreignKey: 'idReparation', targetKey: 'id'});

Reparation.hasMany(Stage, {foreignKey: 'idReparation', sourceKey: 'id'});
Stage.belongsTo(Reparation, {foreignKey: 'idReparation', targetKey: 'id'});

export { Reparation };