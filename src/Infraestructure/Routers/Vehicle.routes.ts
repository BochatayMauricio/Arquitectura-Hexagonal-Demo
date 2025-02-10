import { Router } from "express";
import VehicleService from "../../Application/Vehicle.service";
import { VehicleController } from "../Controllers/Vehicle.controller";
import { VehicleRepository } from "../Repositories/Vehicle.repository";

const repository = new VehicleRepository();
const vehicleService = new VehicleService(repository);
const controller = new VehicleController(vehicleService);

const vehicleRouter = Router();

vehicleRouter.post("/", async (req, res, next) => {
    try {
        await controller.addVehicle(req, res);
    } catch (error) {
        next(error);
    }
});

vehicleRouter.get("/", async (req, res, next) => {
    try {
        await controller.getAllVehicles(req, res);
    } catch (error) {
        next(error);
    }
});

vehicleRouter.get("/:id", async (req, res, next) => {
    try {
        await controller.getVehicleById(req, res);
    } catch (error) {
        next(error);
    }
});

vehicleRouter.put("/:id", async (req,res,next)=>{
    try{
        await controller.updateVehicle(req,res);
    }
    catch(error){
        next(error);
    }
});

vehicleRouter.delete("/:id", async (req,res,next)=>{
    try{
        await controller.deleteVehicle(req,res);
    }
    catch(error){
        next(error);
    }
});

export default vehicleRouter;

