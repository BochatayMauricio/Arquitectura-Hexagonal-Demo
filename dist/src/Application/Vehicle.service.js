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
const duplied_exception_1 = require("../Domain/Exceptions/duplied.exception");
const not_found_exception_1 = require("../Domain/Exceptions/not-found.exception");
const Client_repository_1 = require("../Infraestructure/Repositories/Client.repository");
const Client_Service_1 = require("./Client.Service");
class VehicleService {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    createVehicle(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehiclePatent = yield this.vehicleRepository.getVehicleByPatent(vehicle.patent);
                if (vehiclePatent) {
                    throw new duplied_exception_1.DupliedException("La patente ya está registrada");
                }
                const clientService = new Client_Service_1.ClientService(new Client_repository_1.ClientRepository());
                const client = yield clientService.getClientById(vehicle.idClient);
                if (!client) {
                    throw new not_found_exception_1.NotFoundException("El cliente no existe");
                }
                return yield this.vehicleRepository.addVehicle(vehicle);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAllVehicles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.vehicleRepository.getVehicles();
            }
            catch (error) {
                throw error;
            }
        });
    }
    getVehicleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.vehicleRepository.getVehicleById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateVehicle(vehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleExists = yield this.vehicleRepository.getVehicleById(vehicle.id);
                if (!vehicleExists) {
                    throw new not_found_exception_1.NotFoundException("El vehículo no existe");
                }
                const vehiclePatent = yield this.vehicleRepository.getVehicleByPatent(vehicle.patent);
                if (vehiclePatent && vehiclePatent.id !== vehicle.id) {
                    throw new duplied_exception_1.DupliedException("La patente ya está registrada");
                }
                return yield this.vehicleRepository.updateVehicle(vehicle);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteVehicle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicle = yield this.vehicleRepository.getVehicleById(id);
                if (!vehicle) {
                    throw new not_found_exception_1.NotFoundException("El vehículo no existe");
                }
                //falta verificar si el vehículo tiene servicios asociados antes de eliminarlo
                return yield this.vehicleRepository.deleteVehicle(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = VehicleService;
