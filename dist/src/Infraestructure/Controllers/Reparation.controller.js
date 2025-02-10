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
exports.ReparationController = void 0;
const Reparation_Class_1 = require("../../Domain/Reparation-Class");
const not_found_exception_1 = require("../../Domain/Exceptions/not-found.exception");
const duplied_exception_1 = require("../../Domain/Exceptions/duplied.exception");
const bad_request_exception_1 = require("../../Domain/Exceptions/bad-request.exception");
class ReparationController {
    constructor(reparationService) {
        this.reparationService = reparationService;
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reparations = yield this.reparationService.getAll();
                return res.status(200).json(reparations);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idVehicle, description } = req.body;
            if (!idVehicle || !description) {
                return res.status(400).json("Faltan datos");
            }
            const reparation = new Reparation_Class_1.ReparationClass(idVehicle, description);
            try {
                const reparationAdded = yield this.reparationService.add(reparation);
                return res.status(200).json(reparationAdded);
            }
            catch (error) {
                console.log(error);
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(error.status).json({ message: error.message });
                }
                if (error instanceof duplied_exception_1.DupliedException) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idVehicle, description, retired_date, status, methodPayment, total_amount } = req.body;
            const { id } = req.params;
            if (!idVehicle || !description || !status || !methodPayment || !total_amount) {
                return res.status(400).json("Faltan datos");
            }
            const reparation = new Reparation_Class_1.ReparationClass(idVehicle, description);
            reparation.setId(Number(id));
            if (retired_date != null) {
                reparation.setRetiredDate(retired_date);
            }
            if (retired_date != null) {
                reparation.setRetiredDate(retired_date);
            }
            reparation.setStatus(status);
            reparation.setMethodPayment(methodPayment);
            reparation.setTotalAmount(total_amount);
            try {
                const reparationUpdated = yield this.reparationService.update(reparation);
                return res.status(200).json("Reparacion actualizada");
            }
            catch (error) {
                console.log(error);
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(error.status).json({ message: error.message });
                }
                if (error instanceof bad_request_exception_1.BadRequest) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const reparationDeleted = yield this.reparationService.delete(Number(id));
                return res.status(200).json("Reparacion eliminada");
            }
            catch (error) {
                console.log(error);
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(error.status).json({ message: error.message });
                }
                if (error instanceof bad_request_exception_1.BadRequest) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const reparation = yield this.reparationService.getReparationById(Number(id));
                return res.status(200).json(reparation);
            }
            catch (error) {
                console.log(error);
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    getByVehicle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idVehicle } = req.params;
            try {
                const reparations = yield this.reparationService.getReparationByVehicle(Number(idVehicle));
                return res.status(200).json(reparations);
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
}
exports.ReparationController = ReparationController;
