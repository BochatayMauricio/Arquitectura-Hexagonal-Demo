import { IVehicle } from "../IVehicle";

export interface IVehicleRepository {
    addVehicle(vehicle: IVehicle): Promise<IVehicle|null>;
    updateVehicle(vehicle: IVehicle): Promise<number[]>;
    deleteVehicle(id: Number): Promise<Boolean>;
    getVehicleById(id: Number): Promise<IVehicle|null>;
    getVehicleByPatent(patent: String): Promise<IVehicle|null>;
    getVehicles(): Promise<IVehicle[]>;
}