import { Request, Response } from "express";
import { ReparationService } from "../../Application/Reparation.service";
import { ReparationClass } from "../../Domain/Reparation-Class";
import { NotFoundException } from "../../Domain/Exceptions/not-found.exception";
import { DupliedException } from "../../Domain/Exceptions/duplied.exception";
import { BadRequest } from "../../Domain/Exceptions/bad-request.exception";


export class ReparationController {
    private readonly reparationService: ReparationService;

    constructor(reparationService: ReparationService) {
        this.reparationService = reparationService;
    }

    async getAll(req: Request, res: Response) {
        try {
            const reparations = await this.reparationService.getAll();
            return res.status(200).json(reparations);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

    async add(req:Request, res:Response){
        const {idVehicle,description} = req.body;
        if(!idVehicle || !description ){
            return res.status(400).json("Faltan datos");
        }
        const reparation = new ReparationClass(idVehicle,description);
        try{
            const reparationAdded = await this.reparationService.add(reparation);
            return res.status(200).json(reparationAdded);
        }
        catch(error){
            console.log(error);
            if(error instanceof NotFoundException){
                return res.status(error.status).json({message: error.message});
            }
            if(error instanceof DupliedException){
                return res.status(error.status).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    async update(req:Request, res:Response){
        const {idVehicle,description,retired_date,status,methodPayment,total_amount} = req.body;
        const {id} = req.params;
        if(!idVehicle || !description || !status || !methodPayment || !total_amount){
            return res.status(400).json("Faltan datos");
        }
        const reparation = new ReparationClass(idVehicle,description);
        reparation.setId(Number(id));
        if(retired_date != null){
            reparation.setRetiredDate(retired_date);
        }
        if(retired_date != null){
            reparation.setRetiredDate(retired_date);
        }
        reparation.setStatus(status);
        reparation.setMethodPayment(methodPayment);
        reparation.setTotalAmount(total_amount);
        try{
            const reparationUpdated = await this.reparationService.update(reparation);
            return res.status(200).json("Reparacion actualizada");
        }
        catch(error){
            console.log(error);
            if(error instanceof NotFoundException){
                return res.status(error.status).json({message: error.message});
            }
            if(error instanceof BadRequest){
                return res.status(error.status).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    async delete(req:Request, res:Response){
        const {id} = req.params;
        try{
            const reparationDeleted = await this.reparationService.delete(Number(id));
            return res.status(200).json("Reparacion eliminada");
        }
        catch(error){
            console.log(error);
            if(error instanceof NotFoundException){
                return res.status(error.status).json({message: error.message});
            }
            if(error instanceof BadRequest){
                return res.status(error.status).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    async getById(req:Request, res:Response){
        const {id} = req.params;
        try{
            const reparation = await this.reparationService.getReparationById(Number(id));
            return res.status(200).json(reparation);
        }
        catch(error){
            console.log(error);
            if(error instanceof NotFoundException){
                return res.status(error.status).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

    async getByVehicle(req:Request, res:Response){
        const {idVehicle} = req.params;
        try{
            const reparations = await this.reparationService.getReparationByVehicle(Number(idVehicle));
            return res.status(200).json(reparations);
        }
        catch(error){
            if(error instanceof NotFoundException){
                return res.status(error.status).json({message: error.message});
            }
            return res.status(500).json(error);
        }
    }

}