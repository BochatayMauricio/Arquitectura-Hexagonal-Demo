
import { NullishPropertiesOf } from "sequelize/types/utils";
import { IClient } from "../IClient";

export interface IClientRepository {
    addClient(client: IClient): Promise<IClient | null>;
    updateClient(client: IClient): Promise<number[]>;
    deleteClient(id: Number): Promise<number>;
    findClientById(id: Number): Promise<IClient|null>;
    getClientByEmail(email: string): Promise<IClient | null>;
    findClientByDni(dni: string): Promise<IClient | null>;
    getAllClients(): Promise<IClient[]>;
}