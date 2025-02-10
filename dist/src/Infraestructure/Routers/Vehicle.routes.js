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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vehicle_service_1 = __importDefault(require("../../Application/Vehicle.service"));
const Vehicle_controller_1 = require("../Controllers/Vehicle.controller");
const Vehicle_repository_1 = require("../Repositories/Vehicle.repository");
const repository = new Vehicle_repository_1.VehicleRepository();
const vehicleService = new Vehicle_service_1.default(repository);
const controller = new Vehicle_controller_1.VehicleController(vehicleService);
const vehicleRouter = (0, express_1.Router)();
vehicleRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.addVehicle(req, res);
    }
    catch (error) {
        next(error);
    }
}));
vehicleRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getAllVehicles(req, res);
    }
    catch (error) {
        next(error);
    }
}));
vehicleRouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.getVehicleById(req, res);
    }
    catch (error) {
        next(error);
    }
}));
vehicleRouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.updateVehicle(req, res);
    }
    catch (error) {
        next(error);
    }
}));
vehicleRouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield controller.deleteVehicle(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = vehicleRouter;
