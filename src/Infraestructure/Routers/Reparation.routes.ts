import { Router } from "express";
import { ReparationService } from "../../Application/Reparation.service";
import { ReparationController } from "../Controllers/Reparation.controller";
import { ReparationRepository } from "../Repositories/Reparation.repositoy";

const repository = new ReparationRepository();
const service = new ReparationService(repository);
const controller = new ReparationController(service);

const reparationRouter = Router();

reparationRouter.get("/", async (req, res, next) => {
    try {
        await controller.getAll(req, res);
    } catch (error) {
        next(error);
    }
});

reparationRouter.post("/", async (req, res, next) => {
    try {
        await controller.add(req, res);
    } catch (error) {
        next(error);
    }
});

reparationRouter.put("/:id", async (req, res, next) => {
    try {
        await controller.update(req, res);
    } catch (error) {
        next(error);
    }
});

reparationRouter.delete("/:id", async (req, res, next) => {
    try {
        await controller.delete(req, res);
    } catch (error) {
        next(error);
    }
});

reparationRouter.get("/:id", async (req, res, next) => {
    try {
        await controller.getById(req, res);
    } catch (error) {
        next(error);
    }
});

reparationRouter.get("/vehicle/:idVehicle", async (req, res, next) => {
    try {
        await controller.getByVehicle(req, res);
    } catch (error) {
        next(error);
    }
});

export default reparationRouter;