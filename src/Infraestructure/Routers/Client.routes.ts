import { Router } from "express";
import {ClientController} from "../Controllers/Client.controller";
import { ClientService } from "../../Application/Client.Service";
import { ClientRepository } from "../Repositories/Client.repository";

const repository = new ClientRepository();
const clientService = new ClientService(repository);
const controller= new ClientController(clientService);

const clientRouter = Router();

clientRouter.post("/", async (req, res, next) => {
    try {
      await controller.createClient(req, res);
    } catch (error) {
      next(error);
    }
});

clientRouter.put("/:id", async (req, res, next) => {
    try {
      await controller.updateClient(req, res);
    } catch (error) {
      next(error);
    }
});

clientRouter.delete("/:id", async (req, res, next) => {
    try {
      await controller.deleteClient(req, res);
    } catch (error) {
      next(error);
    }
});

clientRouter.get("/", async (req, res, next) => {
    try {
      await controller.getAllClients(req, res);
    } catch (error) {
      next(error);
    }
});

clientRouter.get("/:id", async (req, res, next) => {
    try {
      await controller.getClientById(req, res);
    } catch (error) {
      next(error);
    }
});

export default clientRouter;

