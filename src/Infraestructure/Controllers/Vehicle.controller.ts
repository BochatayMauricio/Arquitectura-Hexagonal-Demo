import { Request, Response } from "express";
import VehicleService from "../../Application/Vehicle.service";
import { VehicleClass } from "../../Domain/Vehicle-Class";
import { DupliedException } from "../../Domain/Exceptions/duplied.exception";
import { NotFoundException } from "../../Domain/Exceptions/not-found.exception";

export class VehicleController {
    private readonly vehicleService: VehicleService;

    constructor(vehicleService:VehicleService){
        this.vehicleService = vehicleService;
    }

    public async addVehicle(req: Request, res: Response): Promise<Response> {
       const {brand,model,year,color,patent,idClient} = req.body;
       
        if (!brand || !model || !year || !color || !patent || !idClient) {
            return res.status(400).json({ message: `Faltan campos obligatorios` });
        }
        const vehicleBody = new VehicleClass(idClient,brand,model,year,color,patent);
        try{
            const vehicle = await this.vehicleService.createVehicle(vehicleBody);
            return res.status(201).json(vehicle);
        }
        catch(error){
            console.log(error);
            if(error instanceof DupliedException){
                return res.status(400).json({message: error.message});
            }
            if(error instanceof NotFoundException){
                return res.status(404).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    public async getAllVehicles(req: Request, res: Response): Promise<Response> {
        try{
            const vehicles = await this.vehicleService.getAllVehicles();
            return res.status(200).json(vehicles);
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);
        }
    }

    public async getVehicleById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: `Faltan campos obligatorios` });
        }
        try{
            const vehicle = await this.vehicleService.getVehicleById(Number(id));
            return res.status(200).json(vehicle);
        }
        catch(error){
            console.log(error);
            if(error instanceof NotFoundException){
                return res.status(404).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    public async updateVehicle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const {brand,model,year,color,patent,idClient} = req.body;
        if (!id || !brand || !model || !year || !color || !patent || !idClient) {
            return res.status(400).json({ message: `Faltan campos obligatorios` });
        }
        const vehicleBody = new VehicleClass(idClient,brand,model,year,color,patent);
        vehicleBody.setId(Number(id));
        try{
            const rowAffected = await this.vehicleService.updateVehicle(vehicleBody);
            return res.status(200).json({message: `Se actualizó el vehículo con id: ${id}`, rowsAffected: rowAffected});
        }
        catch(error){
            console.log(error);
            if(error instanceof DupliedException){
                return res.status(400).json({message: error.message});
            }
            if(error instanceof NotFoundException){
                return res.status(404).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    public async deleteVehicle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: `Faltan campos obligatorios` });
        }
        try{
            await this.vehicleService.deleteVehicle(Number(id));
            return res.status(200).json({message: `Se eliminó el vehículo con id: ${id}`});
        }
        catch(error){
            console.log(error);
            if(error instanceof NotFoundException){
                return res.status(404).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

}