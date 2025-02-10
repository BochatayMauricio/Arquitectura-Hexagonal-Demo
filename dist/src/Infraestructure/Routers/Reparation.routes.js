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
const Reparation_service_1 = require("../../Application/Reparation.service");
const Reparation_controller_1 = require("../Controllers/Reparation.controller");
const Reparation_repositoy_1 = require("../Repositories/Reparation.repositoy");
const repository = new Reparation_repositoy_1.ReparationRepository();
const service = new Reparation_service_1.ReparationService(repository);
const controller = new Reparation_controller_1.ReparationController(service);
const reparationRouter = (0, express_1.Router)();
reparationRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getAll(req, res);
    }
    catch (error) {
        next(error);
    }
}));
reparationRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.add(req, res);
    }
    catch (error) {
        next(error);
    }
}));
reparationRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.update(req, res);
    }
    catch (error) {
        next(error);
    }
}));
reparationRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.delete(req, res);
    }
    catch (error) {
        next(error);
    }
}));
reparationRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getById(req, res);
    }
    catch (error) {
        next(error);
    }
}));
reparationRouter.get("/vehicle/:idVehicle", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getByVehicle(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = reparationRouter;
