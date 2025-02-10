import { sequelize } from "../../Shared/DB/dbConnection";
import { DataTypes } from "sequelize";
import { Reparation } from "./Reparation";

const Vehicle = sequelize.define('vehicles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idClient: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    model:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    patent: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
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
Vehicle.hasMany(Reparation, {foreignKey: 'idVehicle', sourceKey: 'id'});
Reparation.belongsTo(Vehicle, {foreignKey: 'idVehicle', targetKey: 'id'});
export { Vehicle };