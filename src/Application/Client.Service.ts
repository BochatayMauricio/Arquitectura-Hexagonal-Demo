import { DupliedException } from "../Domain/Exceptions/duplied.exception";
import { NotFoundException } from "../Domain/Exceptions/not-found.exception";
import { IClient } from "../Domain/Interfaces/IClient";
import { IClientRepository } from "../Domain/Interfaces/Repositories/IClient-repository";

export class ClientService {
    private readonly clientRepository: IClientRepository;

    constructor(clientRepository:IClientRepository){
        this.clientRepository = clientRepository;
    }

    public async createClient(client: IClient): Promise<IClient | null> {
       let clientExist = await this.clientRepository.getClientByEmail(client.email.toString());
         if(clientExist){
              throw new DupliedException('Ya existe un cliente registrado con este email');
        }
        clientExist = await this.clientRepository.findClientByDni(client.dni.toString());
        if(clientExist){
            throw new DupliedException('Ya existe un cliente registrado con este DNI');
        }
       return await this.clientRepository.addClient(client);
    }

    public async updateClient(client: IClient): Promise<number[]> {
        let clientExist = await this.clientRepository.findClientById(client.id!);
        if(!clientExist){
            throw new NotFoundException(`Cliente con el id: ${client.id} no encontrado`);
        }
        clientExist = await this.clientRepository.getClientByEmail(client.email.toString());
        if(clientExist && clientExist.id !== client.id){
            throw new DupliedException('Ya existe un cliente registrado con el email: '+client.email);
        }
        clientExist = await this.clientRepository.findClientByDni(client.dni.toString());
        if(clientExist && clientExist.id !== client.id){
            throw new DupliedException('Ya existe un cliente registrado con el DNI: '+client.dni);
        }
        return await this.clientRepository.updateClient(client);
    }

    public async deleteClient(id: Number): Promise<number> {
        const clientExist = await this.clientRepository.findClientById(id);
        if(!clientExist){
            throw new NotFoundException(`Cliente con el id: ${id} no encontrado`);
        }
        try{
             return await this.clientRepository.deleteClient(id);
        }
        catch(error){
            throw new Error("Error al eliminar el cliente");
        }
    }

    public async getAllClients(): Promise<IClient[]> {
        return await this.clientRepository.getAllClients();
    }

    public async getClientById(id: Number): Promise<IClient | null> {
        return await this.clientRepository.findClientById(id);
    }
}