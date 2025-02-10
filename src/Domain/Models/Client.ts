import { sequelize } from "../../Shared/DB/dbConnection";
import { DataTypes, Model } from "sequelize";
import {Vehicle} from "./Vehicle";


const Client = sequelize.define('clients', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    surname:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telephone:{
        type: DataTypes.STRING(64),
        allowNull: false
    },
    dni:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    observations:{
        type: DataTypes.STRING,
        allowNull: true
    },
    type:{ //particular o seguro
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

Client.hasMany(Vehicle, {foreignKey: 'idClient', sourceKey: 'id'});
Vehicle.belongsTo(Client, {foreignKey: 'idClient', targetKey: 'id'});

export default Client;