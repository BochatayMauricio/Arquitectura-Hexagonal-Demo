"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleClass = void 0;
class VehicleClass {
    constructor(idClient, brand, model, year, color, patent) {
        this.idClient = idClient;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.patent = patent;
    }
    setId(id) {
        this.id = id;
    }
    getIdClient() {
        return this.idClient;
    }
    getBrand() {
        return this.brand;
    }
    getModel() {
        return this.model;
    }
    getYear() {
        return this.year;
    }
    getColor() {
        return this.color;
    }
    getPatent() {
        return this.patent;
    }
    setIdClient(idClient) {
        this.idClient = idClient;
    }
    setDateUpdate(date) {
        this.updatedAt = date;
    }
}
exports.VehicleClass = VehicleClass;
