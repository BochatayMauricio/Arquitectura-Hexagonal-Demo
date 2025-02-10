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
exports.ClientService = void 0;
const duplied_exception_1 = require("../Domain/Exceptions/duplied.exception");
const not_found_exception_1 = require("../Domain/Exceptions/not-found.exception");
class ClientService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientExist = yield this.clientRepository.getClientByEmail(client.email.toString());
            if (clientExist) {
                throw new duplied_exception_1.DupliedException('Ya existe un cliente registrado con este email');
            }
            clientExist = yield this.clientRepository.findClientByDni(client.dni.toString());
            if (clientExist) {
                throw new duplied_exception_1.DupliedException('Ya existe un cliente registrado con este DNI');
            }
            return yield this.clientRepository.addClient(client);
        });
    }
    updateClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientExist = yield this.clientRepository.findClientById(client.id);
            if (!clientExist) {
                throw new not_found_exception_1.NotFoundException(`Cliente con el id: ${client.id} no encontrado`);
            }
            clientExist = yield this.clientRepository.getClientByEmail(client.email.toString());
            if (clientExist && clientExist.id !== client.id) {
                throw new duplied_exception_1.DupliedException('Ya existe un cliente registrado con el email: ' + client.email);
            }
            clientExist = yield this.clientRepository.findClientByDni(client.dni.toString());
            if (clientExist && clientExist.id !== client.id) {
                throw new duplied_exception_1.DupliedException('Ya existe un cliente registrado con el DNI: ' + client.dni);
            }
            return yield this.clientRepository.updateClient(client);
        });
    }
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientExist = yield this.clientRepository.findClientById(id);
            if (!clientExist) {
                throw new not_found_exception_1.NotFoundException(`Cliente con el id: ${id} no encontrado`);
            }
            try {
                return yield this.clientRepository.deleteClient(id);
            }
            catch (error) {
                throw new Error("Error al eliminar el cliente");
            }
        });
    }
    getAllClients() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientRepository.getAllClients();
        });
    }
    getClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientRepository.findClientById(id);
        });
    }
}
exports.ClientService = ClientService;
