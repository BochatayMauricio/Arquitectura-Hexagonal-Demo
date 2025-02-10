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
exports.ReparationService = void 0;
const bad_request_exception_1 = require("../Domain/Exceptions/bad-request.exception");
const duplied_exception_1 = require("../Domain/Exceptions/duplied.exception");
const not_found_exception_1 = require("../Domain/Exceptions/not-found.exception");
const Vehicle_repository_1 = require("../Infraestructure/Repositories/Vehicle.repository");
const Vehicle_service_1 = __importDefault(require("./Vehicle.service"));
class ReparationService {
    constructor(reparationRepository) {
        this.reparationRepository = reparationRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reparationRepository.getAll();
        });
    }
    add(reparation) {
        return __awaiter(this, void 0, void 0, function* () {
            let vehicleService = new Vehicle_service_1.default(new Vehicle_repository_1.VehicleRepository());
            try {
                const vehicleExists = yield vehicleService.getVehicleById(reparation.idVehicle);
                if (vehicleExists == null) {
                    throw new not_found_exception_1.NotFoundException(`El vehiculo con id ${reparation.idVehicle} no existe`);
                }
                const otherReparations = yield this.reparationRepository.getByVehicle(reparation.idVehicle);
                if (otherReparations.length > 0) {
                    const lastReparation = otherReparations[otherReparations.length - 1];
                    if (lastReparation.status == "Pendiente") {
                        throw new duplied_exception_1.DupliedException(`El vehiculo con id ${reparation.idVehicle} tiene una reparacion pendiente`);
                    }
                }
                return yield this.reparationRepository.add(reparation);
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                if (error instanceof duplied_exception_1.DupliedException) {
                    throw error;
                }
                throw new Error("Error al agregar la reparacion");
            }
        });
    }
    update(reparation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparationExists = yield this.reparationRepository.getById(reparation.id);
                if (reparationExists == null) {
                    throw new not_found_exception_1.NotFoundException(`La reparacion con id ${reparation.id} no existe`);
                }
                if (reparation.getStatus() == "Finalizado") {
                    reparation.setTimeReparation(Math.floor((new Date().getTime() - new Date(reparationExists.createdAt).getTime()) / 1000));
                }
                return yield this.reparationRepository.update(reparation);
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                throw new Error("Error al actualizar la reparacion");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparationExists = yield this.reparationRepository.getById(id);
                if (reparationExists == null) {
                    throw new not_found_exception_1.NotFoundException(`La reparacion con id ${id} no existe`);
                }
                if (reparationExists.status == "Pendiente") {
                    throw new bad_request_exception_1.BadRequest("No se puede eliminar una reparacion pendiente");
                }
                return yield this.reparationRepository.delete(id);
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                if (error instanceof bad_request_exception_1.BadRequest) {
                    throw error;
                }
                throw new Error("Error al eliminar la reparacion");
            }
        });
    }
    getReparationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparationExists = yield this.reparationRepository.getById(id);
                if (reparationExists == null) {
                    throw new not_found_exception_1.NotFoundException(`La reparacion con id ${id} no existe`);
                }
                return reparationExists;
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                throw new Error("Error al buscar la reparacion");
            }
        });
    }
    getReparationByVehicle(idVehicle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const vehicleService = new Vehicle_service_1.default(new Vehicle_repository_1.VehicleRepository());
                const vehicleExists = yield vehicleService.getVehicleById(idVehicle);
                if (vehicleExists == null) {
                    throw new not_found_exception_1.NotFoundException(`El vehiculo con id ${idVehicle} no existe`);
                }
                return yield this.reparationRepository.getByVehicle(idVehicle);
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                throw new Error(`Error al buscar las reparaciones del vehiculo con id: ${idVehicle}`);
            }
        });
    }
}
exports.ReparationService = ReparationService;
