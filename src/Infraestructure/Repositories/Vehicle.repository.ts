import { NotFoundException } from "../../Domain/Exceptions/not-found.exception";
import { IVehicle } from "../../Domain/Interfaces/IVehicle";
import { IVehicleRepository } from "../../Domain/Interfaces/Repositories/IVehicle-repository";
import { Vehicle } from "../../Domain/Models/Vehicle";

export class VehicleRepository implements IVehicleRepository {

    public async addVehicle(vehicle: IVehicle): Promise<IVehicle> {
        try{
            const vehicleRegistered = await Vehicle.create({
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                color: vehicle.color,
                patent: vehicle.patent,
                idClient: vehicle.idClient,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return vehicleRegistered.dataValues;
        }
        catch(error){
            throw new Error("Error al registrar el vehículo");
        }
    }

    public async updateVehicle(vehicle: IVehicle): Promise<number[]> {
        return Vehicle.update(vehicle,{where:{id:vehicle.id}});
    }

    public async deleteVehicle(id: Number): Promise<Boolean> {
        return await Vehicle.destroy({where:{id:id}}) > 0;
    }

    public async getVehicleById(id: Number): Promise<IVehicle | null> {
        try{
            const vehicle = await Vehicle.findOne({where:{id:id}});
            if(!vehicle){
                throw new NotFoundException("Vehículo no encontrado");
            }
            return vehicle.dataValues;
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            throw new Error("Error al obtener el vehículo");
        }
    }


    public async getVehicleByPatent(patent: String): Promise<IVehicle | null> {
       try{
            const vehicle = await Vehicle.findOne({where:{patent:patent}});
            if(!vehicle){
                return null;
            }
            return vehicle.dataValues;
        }
        catch(error){
            throw new Error("Error al obtener el vehículo");
        }
    }

    public async getVehicles(): Promise<IVehicle[]> {
        try{
            const vehicles = await Vehicle.findAll();
            return vehicles.map(vehicle => vehicle.dataValues);
        }
        catch(error){
            throw new Error("Error al obtener los vehículos");
        }
    }


}