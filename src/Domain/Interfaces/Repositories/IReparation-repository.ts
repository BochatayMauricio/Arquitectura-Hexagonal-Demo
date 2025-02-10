import { IReparation } from "../IReparation";

export interface IReparationRepository {
    add(reparation: IReparation): Promise<IReparation | null>;
    update(reparation: IReparation): Promise<number[]>;
    delete(id: Number): Promise<Boolean>;
    getById(id: Number): Promise<IReparation | null>;
    getAll(): Promise<IReparation[]>;
    getByVehicle(idVehicle: Number): Promise<IReparation[]>;
    getByClient(idClient: Number): Promise<IReparation[]>;
    getByStatus(status: String): Promise<IReparation[]>;
    getByDate(date: Date): Promise<IReparation[]>;
}