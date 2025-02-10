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
exports.VehicleController = void 0;
const Vehicle_Class_1 = require("../../Domain/Vehicle-Class");
const duplied_exception_1 = require("../../Domain/Exceptions/duplied.exception");
const not_found_exception_1 = require("../../Domain/Exceptions/not-found.exception");
class VehicleController {
    constructor(vehicleService) {
        this.vehicleService = vehicleService;
    }
    addVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { brand, model, year, color, patent, idClient } = req.body;
            if (!brand || !model || !year || !color || !patent || !idClient) {
                return res.status(400).json({ message: `Faltan campos obligatorios` });
            }
            const vehicleBody = new Vehicle_Class_1.VehicleClass(idClient, brand, model, year, color, patent);
            try {
                const vehicle = yield this.vehicleService.createVehicle(vehicleBody);
                return res.status(201).json(vehicle);
            }
            catch (error) {
                console.log(error);
                if (error instanceof duplied_exception_1.DupliedException) {
                    return res.status(400).json({ message: error.message });
                }
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    getAllVehicles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicles = yield this.vehicleService.getAllVehicles();
                return res.status(200).json(vehicles);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    getVehicleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: `Faltan campos obligatorios` });
            }
            try {
                const vehicle = yield this.vehicleService.getVehicleById(Number(id));
                return res.status(200).json(vehicle);
            }
            catch (error) {
                console.log(error);
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    updateVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { brand, model, year, color, patent, idClient } = req.body;
            if (!id || !brand || !model || !year || !color || !patent || !idClient) {
                return res.status(400).json({ message: `Faltan campos obligatorios` });
            }
            const vehicleBody = new Vehicle_Class_1.VehicleClass(idClient, brand, model, year, color, patent);
            vehicleBody.setId(Number(id));
            try {
                const rowAffected = yield this.vehicleService.updateVehicle(vehicleBody);
                return res.status(200).json({ message: `Se actualizó el vehículo con id: ${id}`, rowsAffected: rowAffected });
            }
            catch (error) {
                console.log(error);
                if (error instanceof duplied_exception_1.DupliedException) {
                    return res.status(400).json({ message: error.message });
                }
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    deleteVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: `Faltan campos obligatorios` });
            }
            try {
                yield this.vehicleService.deleteVehicle(Number(id));
                return res.status(200).json({ message: `Se eliminó el vehículo con id: ${id}` });
            }
            catch (error) {
                console.log(error);
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(404).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
}
exports.VehicleController = VehicleController;
