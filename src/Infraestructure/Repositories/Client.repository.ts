import { Model } from "sequelize";
import { ClientClass } from "../../Domain/Client-Class";
import { IClient } from "../../Domain/Interfaces/IClient";
import { IClientRepository } from "../../Domain/Interfaces/Repositories/IClient-repository";
import Client from "../../Domain/Models/Client";
import { NotFoundException } from "../../Domain/Exceptions/not-found.exception";


export class ClientRepository implements IClientRepository {

    public async addClient(client: ClientClass): Promise<IClient|null> {
    console.log("Cliente recibido: ",client);
    try{
        const clientRegisted = await Client.create({
        name: client.name,
        surname: client.surname,
        email: client.email,
        telephone: client.telephone,
        dni: client.dni,
        observations: client.observations,
        type: client.type
        });
        console.log("Cliente registrado: ",clientRegisted);
        return clientRegisted.dataValues;
    }
    catch(error){
        console.log("Error al crear el cliente: ",error);
        throw new Error("Error al crear el cliente");
    }
  }

    public async updateClient(client: IClient): Promise<number[]>{
        return await Client.update(client, { where: { id: client.id } });
    }

    public async deleteClient(id: Number): Promise<number> {
        return await Client.destroy({where: {id: id}});
    }


    public async findClientById(id: Number): Promise<IClient|null> {
        try{
            const client = await Client.findOne({where: {id: id}});
            if(!client){
                throw new NotFoundException(`Cliente con el id: ${id} no encontrado`);
            }
            return client.dataValues;
        }
        catch(error){
            if(error instanceof NotFoundException){
                throw error;
            }
            throw new Error("Error al buscar el cliente");
        }
    }

    public async getAllClients(): Promise<IClient[]> {
       try{
        const clients = await Client.findAll();
        return clients.map(client => client.dataValues);
       }
       catch(error){
              throw new Error("Error al buscar los clientes");
       }
    }

    public async getClientByEmail(email: string): Promise<IClient | null> {
        try{
            const client = await Client.findOne({where: {email: email}});
            if(!client){
                return null;
            }
            return client.dataValues;
        }
        catch(error){
            throw new Error("Error al buscar el cliente");
        }
    }

    public async findClientByDni(dni: string): Promise<IClient | null> {
        try{
            const client = await Client.findOne({where: {dni: dni}});
            if(!client){
                return null;
            }
            return client.dataValues;
        }
        catch(error){
            throw new Error("Error al buscar el cliente");
        }
    }

}