import { sequelize } from "../../Shared/DB/dbConnection";
import { DataTypes } from "sequelize";
import { Images } from "./Images";

const Stage = sequelize.define('stages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idReparation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{ //nombre de la etapa[DESARMADO Y ENDEREZADO,LIJADO,PINTURA,ARMADO Y PULIDO]
        type: DataTypes.STRING(30),
        allowNull: false
    },
    exit_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time_permanency:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    observations:{
        type: DataTypes.STRING,
        allowNull: true
    },
    status:{ //[pendiente, en proceso, finalizado]
        type: DataTypes.STRING(20),
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

Stage.hasMany(Images, {foreignKey: 'idStage', sourceKey: 'id'});
Images.belongsTo(Stage, {foreignKey: 'idStage', targetKey: 'id'});

export { Stage };