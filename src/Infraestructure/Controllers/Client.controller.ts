import { Request, Response } from "express";
import { ClientService } from "../../Application/Client.Service";
import { ClientClass } from "../../Domain/Client-Class";
import { ClientRepository } from "../Repositories/Client.repository";
import { DupliedException } from "../../Domain/Exceptions/duplied.exception";
import { NotFoundException } from "../../Domain/Exceptions/not-found.exception";

export class ClientController {

  constructor(private readonly clientService: ClientService) {}

  async createClient(req:Request, res:Response) {

    const {name,surname,email,dni,telephone,observations,type} = req.body;
    
    if (!name || !surname || !email || !dni || !telephone || !type) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const clientBody:ClientClass = new ClientClass(name,surname,email,telephone,dni,observations,type);
    try{
      console.log("Cliente recibido en controlador: ",clientBody);
      const client = await this.clientService.createClient(clientBody);
      return res.status(201).json(client);
    }
    catch(error){
      console.log(error);
      if(error instanceof DupliedException){
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error);
    }
  }

  async updateClient(req:Request, res: Response) {
    const {id} = req.params;
    const {name,surname,email,dni,telephone,observations,type} = req.body;
    if (!name || !surname || !email || !dni || !telephone || !type) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    let clientBody:ClientClass = new ClientClass(name,surname,email,telephone,dni,observations,type);
    clientBody.setId(Number(id));
    try{
      const rowAffected = await this.clientService.updateClient(clientBody);
      return res.status(200).json({message: `Se actualizó el cliente con id: ${id}`, rowsAffected: rowAffected});
    }
    catch(error){
      console.log(error);
      if(error instanceof DupliedException){
        return res.status(error.status).json({ message: error.message });
      }
      if(error instanceof NotFoundException){
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error);
    }
  }

  async deleteClient(req:Request, res: Response) {
    const {id} = req.params;
    try{
      await this.clientService.deleteClient(Number(id));
      return res.status(200).json({message: `Se eliminó el cliente con id: ${id}`});
    }
    catch(error){
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getAllClients(req:Request, res: Response) {
    try{
      const clients = await this.clientService.getAllClients();
      return res.status(200).json(clients);
    }
    catch(error){
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getClientById(req:Request, res: Response) {
    const {id} = req.params;
    try{
      const client = await this.clientService.getClientById(Number(id));
      return res.status(200).json(client);
    }
    catch(error){
      console.log(error);
      if(error instanceof NotFoundException){
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(500).json(error);
    }
  }

}