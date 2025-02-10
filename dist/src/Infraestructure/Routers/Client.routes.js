"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Client_controller_1 = require("../Controllers/Client.controller");
const Client_Service_1 = require("../../Application/Client.Service");
const Client_repository_1 = require("../Repositories/Client.repository");
const repository = new Client_repository_1.ClientRepository();
const clientService = new Client_Service_1.ClientService(repository);
const controller = new Client_controller_1.ClientController(clientService);
const clientRouter = (0, express_1.Router)();
clientRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.createClient(req, res);
    }
    catch (error) {
        next(error);
    }
}));
clientRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.updateClient(req, res);
    }
    catch (error) {
        next(error);
    }
}));
clientRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.deleteClient(req, res);
    }
    catch (error) {
        next(error);
    }
}));
clientRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getAllClients(req, res);
    }
    catch (error) {
        next(error);
    }
}));
clientRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getClientById(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = clientRouter;
