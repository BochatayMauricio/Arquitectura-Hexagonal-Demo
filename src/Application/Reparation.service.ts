import { equals } from "validator";
import { BadRequest } from "../Domain/Exceptions/bad-request.exception";
import { DupliedException } from "../Domain/Exceptions/duplied.exception";
import { NotFoundException } from "../Domain/Exceptions/not-found.exception";
import { IReparation } from "../Domain/Interfaces/IReparation";
import { IReparationRepository } from "../Domain/Interfaces/Repositories/IReparation-repository";
import { ReparationClass } from "../Domain/Reparation-Class";
import { VehicleRepository } from "../Infraestructure/Repositories/Vehicle.repository";
import VehicleService from "./Vehicle.service";

export class ReparationService {
    private readonly reparationRepository: IReparationRepository;

    constructor(reparationRepository: IReparationRepository) {
        this.reparationRepository = reparationRepository;
    }

    async getAll(): Promise<IReparation[]> {
        return await this.reparationRepository.getAll();
    }

    async add(reparation: IReparation): Promise<IReparation | null> {
        let vehicleService = new VehicleService(new VehicleRepository());
        try{
            const vehicleExists = await vehicleService.getVehicleById(reparation.idVehicle);
            if(vehicleExists == null){
                throw new NotFoundException(`El vehiculo con id ${reparation.idVehicle} no existe`);
            }
            const otherReparations = await this.reparationRepository.getByVehicle(reparation.idVehicle);
            if(otherReparations.length > 0){
                const lastReparation = otherReparations[otherReparations.length - 1];
                if(lastReparation.status == "Pendiente"){
                    throw new DupliedException(`El vehiculo con id ${reparation.idVehicle} tiene una reparacion pendiente`);
                }
            }
            return await this.reparationRepository.add(reparation);
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            if(error instanceof DupliedException){
                throw error;
            }
            throw new Error("Error al agregar la reparacion");
        }
    }

    async update(reparation: ReparationClass): Promise<number[]> {
        try{
            const reparationExists = await this.reparationRepository.getById(reparation.id!);
            if(reparationExists == null){
                throw new NotFoundException(`La reparacion con id ${reparation.id} no existe`);
            }
            if(reparation.getStatus() == "Finalizado"){
                reparation.setTimeReparation(Math.floor((new Date().getTime() - new Date(reparationExists.createdAt!).getTime()) / 1000));
            }
            return await this.reparationRepository.update(reparation);
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            throw new Error("Error al actualizar la reparacion");
        }
    }

    async delete(id: Number): Promise<Boolean> {
        try{
            const reparationExists = await this.reparationRepository.getById(id);
            if(reparationExists == null){
                throw new NotFoundException(`La reparacion con id ${id} no existe`);
            }
            if(reparationExists.status == "Pendiente"){
                throw new BadRequest("No se puede eliminar una reparacion pendiente");
            }
            return await this.reparationRepository.delete(id);
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            if(error instanceof BadRequest){
                throw error;
            }
            throw new Error("Error al eliminar la reparacion");
        }
    }

    async getReparationById(id: Number): Promise<IReparation | null> {
        try{
            const reparationExists = await this.reparationRepository.getById(id);
            if(reparationExists == null){
                throw new NotFoundException(`La reparacion con id ${id} no existe`);
            }
            return reparationExists;
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            throw new Error("Error al buscar la reparacion");
        }
    }

    async getReparationByVehicle(idVehicle: Number): Promise<IReparation[]> {
        try{
            const vehicleService = new VehicleService(new VehicleRepository());
            const vehicleExists = await vehicleService.getVehicleById(idVehicle);
            if(vehicleExists == null){
                throw new NotFoundException(`El vehiculo con id ${idVehicle} no existe`);
            }
            return await this.reparationRepository.getByVehicle(idVehicle);
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            throw new Error(`Error al buscar las reparaciones del vehiculo con id: ${idVehicle}`);
        }
    }



}