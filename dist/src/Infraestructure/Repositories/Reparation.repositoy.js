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
exports.ReparationRepository = void 0;
const Reparation_1 = require("../../Domain/Models/Reparation");
class ReparationRepository {
    add(reparation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newReparation = yield Reparation_1.Reparation.create({
                    idVehicle: reparation.idVehicle,
                    description: reparation.description,
                    status: reparation.status,
                    retired_date: reparation.retired_date,
                    time_reparation: reparation.time_reparation,
                    total_amount: reparation.total_amount,
                    methodPayment: reparation.methodPayment
                });
                return newReparation.dataValues;
            }
            catch (error) {
                throw new Error("Error al agregar la reparacion");
            }
        });
    }
    update(reparation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Reparation_1.Reparation.update(reparation, { where: { id: reparation.id } });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Reparation_1.Reparation.destroy({ where: { id: id } })) > 0;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparation = yield Reparation_1.Reparation.findOne({ where: { id: id } });
                if (reparation == null) {
                    return null;
                }
                return reparation.dataValues;
            }
            catch (error) {
                throw new Error("Error al buscar la reparacion");
            }
        });
    }
    getByVehicle(vehicleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparations = yield Reparation_1.Reparation.findAll({ where: { idVehicle: vehicleId } });
                return reparations.map(reparation => reparation.dataValues);
            }
            catch (error) {
                throw new Error(`Error al buscar las reparaciones del vehiculo con id: ${vehicleId}`);
            }
        });
    }
    getByClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    getByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    getByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparations = yield Reparation_1.Reparation.findAll();
                return reparations.map(reparation => reparation.dataValues);
            }
            catch (error) {
                throw new Error("Error al buscar las reparaciones");
            }
        });
    }
}
exports.ReparationRepository = ReparationRepository;
