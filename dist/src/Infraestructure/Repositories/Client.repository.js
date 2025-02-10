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
exports.ClientRepository = void 0;
const Client_1 = __importDefault(require("../../Domain/Models/Client"));
const not_found_exception_1 = require("../../Domain/Exceptions/not-found.exception");
class ClientRepository {
    addClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Cliente recibido: ", client);
            try {
                const clientRegisted = yield Client_1.default.create({
                    name: client.name,
                    surname: client.surname,
                    email: client.email,
                    telephone: client.telephone,
                    dni: client.dni,
                    observations: client.observations,
                    type: client.type
                });
                console.log("Cliente registrado: ", clientRegisted);
                return clientRegisted.dataValues;
            }
            catch (error) {
                console.log("Error al crear el cliente: ", error);
                throw new Error("Error al crear el cliente");
            }
        });
    }
    updateClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.update(client, { where: { id: client.id } });
        });
    }
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Client_1.default.destroy({ where: { id: id } });
        });
    }
    findClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield Client_1.default.findOne({ where: { id: id } });
                if (!client) {
                    throw new not_found_exception_1.NotFoundException(`Cliente con el id: ${id} no encontrado`);
                }
                return client.dataValues;
            }
            catch (error) {
                if (error instanceof not_found_exception_1.NotFoundException) {
                    throw error;
                }
                throw new Error("Error al buscar el cliente");
            }
        });
    }
    getAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield Client_1.default.findAll();
                return clients.map(client => client.dataValues);
            }
            catch (error) {
                throw new Error("Error al buscar los clientes");
            }
        });
    }
    getClientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield Client_1.default.findOne({ where: { email: email } });
                if (!client) {
                    return null;
                }
                return client.dataValues;
            }
            catch (error) {
                throw new Error("Error al buscar el cliente");
            }
        });
    }
    findClientByDni(dni) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield Client_1.default.findOne({ where: { dni: dni } });
                if (!client) {
                    return null;
                }
                return client.dataValues;
            }
            catch (error) {
                throw new Error("Error al buscar el cliente");
            }
        });
    }
}
exports.ClientRepository = ClientRepository;
