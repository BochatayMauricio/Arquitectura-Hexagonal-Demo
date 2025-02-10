"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReparationClass = void 0;
class ReparationClass {
    constructor(idVehicle, description) {
        this.idVehicle = idVehicle;
        this.description = description;
        this.status = "Pendiente";
        this.total_amount = 0;
        this.methodPayment = "Efectivo";
        this.time_reparation = 0;
    }
    setId(id) {
        this.id = id;
    }
    setCreatedAt(date) {
        this.created_at = date;
    }
    setUpdatedAt(date) {
        this.updated_at = date;
    }
    getId() {
        if (this.id == undefined) {
            return 0;
        }
        return this.id;
    }
    getIdVehicle() {
        return this.idVehicle;
    }
    getDescription() {
        return this.description;
    }
    getStatus() {
        return this.status;
    }
    getRetiredDate() {
        if (this.retired_date == undefined) {
            return null;
        }
        return this.retired_date;
    }
    getTimeReparation() {
        return this.time_reparation;
    }
    getTotalAmount() {
        return this.total_amount;
    }
    getMethodPayment() {
        return this.methodPayment;
    }
    getCreatedAt() {
        if (this.created_at == undefined) {
            return new Date();
        }
        return this.created_at;
    }
    getUpdatedAt() {
        if (this.updated_at == undefined) {
            return new Date();
        }
        return this.updated_at;
    }
    setStatus(status) {
        this.status = status;
    }
    setRetiredDate(date) {
        this.retired_date = date;
    }
    setTimeReparation(time) {
        this.time_reparation = time;
    }
    setTotalAmount(amount) {
        this.total_amount = amount;
    }
    setMethodPayment(method) {
        this.methodPayment = method;
    }
    setDescription(description) {
        this.description = description;
    }
    setIdVehicle(idVehicle) {
        this.idVehicle = idVehicle;
    }
}
exports.ReparationClass = ReparationClass;
