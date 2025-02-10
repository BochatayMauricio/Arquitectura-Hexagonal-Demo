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
exports.ClientController = void 0;
const Client_Class_1 = require("../../Domain/Client-Class");
const duplied_exception_1 = require("../../Domain/Exceptions/duplied.exception");
const not_found_exception_1 = require("../../Domain/Exceptions/not-found.exception");
class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    createClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, surname, email, dni, telephone, observations, type } = req.body;
            if (!name || !surname || !email || !dni || !telephone || !type) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }
            const clientBody = new Client_Class_1.ClientClass(name, surname, email, telephone, dni, observations, type);
            try {
                console.log("Cliente recibido en controlador: ", clientBody);
                const client = yield this.clientService.createClient(clientBody);
                return res.status(201).json(client);
            }
            catch (error) {
                console.log(error);
                if (error instanceof duplied_exception_1.DupliedException) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    updateClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, surname, email, dni, telephone, observations, type } = req.body;
            if (!name || !surname || !email || !dni || !telephone || !type) {
                return res.status(400).json({ message: "Faltan campos obligatorios" });
            }
            let clientBody = new Client_Class_1.ClientClass(name, surname, email, telephone, dni, observations, type);
            clientBody.setId(Number(id));
            try {
                const rowAffected = yield this.clientService.updateClient(clientBody);
                return res.status(200).json({ message: `Se actualizó el cliente con id: ${id}`, rowsAffected: rowAffected });
            }
            catch (error) {
                console.log(error);
                if (error instanceof duplied_exception_1.DupliedException) {
                    return res.status(error.status).json({ message: error.message });
                }
                if (error instanceof not_found_exception_1.NotFoundException) {
                    return res.status(error.status).json({ message: error.message });
                }
                return res.status(500).json(error);
            }
        });
    }
    deleteClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.clientService.deleteClient(Number(id));
                return res.status(200).json({ message: `Se eliminó el cliente con id: ${id}` });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    getAllClients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield this.clientService.getAllClients();
                return res.status(200).json(clients);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    getClientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const client = yield this.clientService.getClientById(Number(id));
                return res.status(200).json(client);
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
}
exports.ClientController = ClientController;
