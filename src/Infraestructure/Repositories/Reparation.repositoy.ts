import { IReparation } from "../../Domain/Interfaces/IReparation";
import { IReparationRepository } from "../../Domain/Interfaces/Repositories/IReparation-repository";
import { Reparation } from "../../Domain/Models/Reparation";

export class ReparationRepository implements IReparationRepository {

    public async add(reparation: IReparation): Promise<IReparation|null> {
        try{

            const newReparation = await Reparation.create({
                idVehicle: reparation.idVehicle,
                description: reparation.description,
                status: reparation.status,
                retired_date: reparation.retired_date,
                time_reparation: reparation.time_reparation,
                total_amount: reparation.total_amount,
                methodPayment: reparation.methodPayment
            });
            return newReparation.dataValues;
        }
        catch(error){
            throw new Error("Error al agregar la reparacion");
        }
    }

    public async update(reparation: IReparation): Promise<number[]> {
        return await Reparation.update(reparation,{where:{id:reparation.id}});
    }

    public async delete(id: Number): Promise<Boolean> {
        return await Reparation.destroy({where:{id:id}})>0;
    }

    public async getById(id: Number): Promise<IReparation | null> {
        try{
            const reparation = await Reparation.findOne({where:{id:id}});
            if(reparation == null){
                return null;
            }
            return reparation.dataValues;
        }
        catch(error){
            throw new Error("Error al buscar la reparacion");
        }
    }

    public async getByVehicle(vehicleId: Number): Promise<IReparation[]> {
        try{
            const reparations = await Reparation.findAll({where:{idVehicle:vehicleId}});
            return reparations.map(reparation => reparation.dataValues);
        }
        catch(error){
            throw new Error(`Error al buscar las reparaciones del vehiculo con id: ${vehicleId}`);
        }
    }

    public async getByClient(clientId: Number): Promise<IReparation[]> {
        return [];
    }

    public async getByStatus(status: String): Promise<IReparation[]> {
        return [];
    }

    public async getByDate(date: Date): Promise<IReparation[]> {
        return [];
    }

    public async getAll(): Promise<IReparation[]> {
        try{
            const reparations = await Reparation.findAll();
            return reparations.map(reparation => reparation.dataValues);
        }
        catch(error){
            throw new Error("Error al buscar las reparaciones");
        }
    }
    
}
