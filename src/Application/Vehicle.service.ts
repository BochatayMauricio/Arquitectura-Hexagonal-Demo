import { DupliedException } from "../Domain/Exceptions/duplied.exception";
import { NotFoundException } from "../Domain/Exceptions/not-found.exception";
import { IVehicle } from "../Domain/Interfaces/IVehicle";
import { IVehicleRepository } from "../Domain/Interfaces/Repositories/IVehicle-repository";
import { ClientRepository } from "../Infraestructure/Repositories/Client.repository";
import { ClientService } from "./Client.Service";

export default class VehicleService {
    private readonly vehicleRepository: IVehicleRepository;

    constructor(vehicleRepository:IVehicleRepository){
        this.vehicleRepository = vehicleRepository;
    }

    public async createVehicle(vehicle: IVehicle): Promise<IVehicle | null> {
        try{
            const vehiclePatent = await this.vehicleRepository.getVehicleByPatent(vehicle.patent);
            if(vehiclePatent){
                throw new DupliedException("La patente ya está registrada");
            }

            const clientService = new ClientService(new ClientRepository());
            const client = await clientService.getClientById(vehicle.idClient);
            if(!client){
                throw new NotFoundException("El cliente no existe");
            }
           return await this.vehicleRepository.addVehicle(vehicle);
        }
        catch(error){
            throw error;
        }
    }

    public async getAllVehicles(): Promise<IVehicle[]> {
        try{
            return await this.vehicleRepository.getVehicles();
        }
        catch(error){
            throw error;
        }
    }

    public async getVehicleById(id: Number): Promise<IVehicle | null> {
        try{
            return await this.vehicleRepository.getVehicleById(id);
        }
        catch(error){
            throw error;
        }
    }

    public async updateVehicle(vehicle: IVehicle): Promise<number[]> {
        try{
            const vehicleExists = await this.vehicleRepository.getVehicleById(vehicle.id!);
            if(!vehicleExists){
                throw new NotFoundException("El vehículo no existe");
            }
            const vehiclePatent = await this.vehicleRepository.getVehicleByPatent(vehicle.patent);
            if(vehiclePatent && vehiclePatent.id !== vehicle.id){
                throw new DupliedException("La patente ya está registrada");
            }
            return await this.vehicleRepository.updateVehicle(vehicle);
        }
        catch(error){
            throw error;
        }
    }

    public async deleteVehicle(id: Number): Promise<Boolean> {
        try{
            const vehicle = await this.vehicleRepository.getVehicleById(id);
            if(!vehicle){
                throw new NotFoundException("El vehículo no existe");
            }
            //falta verificar si el vehículo tiene servicios asociados antes de eliminarlo
            return await this.vehicleRepository.deleteVehicle(id);
        }
        catch(error){
            throw error;
        }
    }
}