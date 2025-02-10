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
exports.VehicleRepository = void 0;
const not_found_exception_1 = require("../../Domain/Exceptions/not-found.exception");
const Vehicle_1 = require("../../Domain/Models/Vehicle");
class VehicleRepository {
    addVehicle(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleRegistered = yield Vehicle_1.Vehicle.create({
                    brand: vehicle.brand,
                    model: vehicle.model,
                    year: vehicle.year,
                    color: vehicle.color,
                    patent: vehicle.patent,
                    idClient: vehicle.idClient,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                return vehicleRegistered.dataValues;
            }
            catch (error) {
                throw new Error("Error al registrar el vehículo");
            }
        });
    }
    updateVehicle(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            return Vehicle_1.Vehicle.update(vehicle, { where: { id: vehicle.id } });
        });
    }
    deleteVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Vehicle_1.Vehicle.destroy({ where: { id: id } })) > 0;
        });
    }
    getVehicleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield Vehicle_1.Vehicle.findOne({ where: { id: id } });
                if (!vehicle) {
                    throw new not_found_exception_1.NotFoundException("Vehículo no encontrado");
                }
                return vehicle.dataValues;
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                throw new Error("Error al obtener el vehículo");
            }
        });
    }
    getVehicleByPatent(patent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield Vehicle_1.Vehicle.findOne({ where: { patent: patent } });
                if (!vehicle) {
                    return null;
                }
                return vehicle.dataValues;
            }
            catch (error) {
                throw new Error("Error al obtener el vehículo");
            }
        });
    }
    getVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicles = yield Vehicle_1.Vehicle.findAll();
                return vehicles.map(vehicle => vehicle.dataValues);
            }
            catch (error) {
                throw new Error("Error al obtener los vehículos");
            }
        });
    }
}
exports.VehicleRepository = VehicleRepository;
