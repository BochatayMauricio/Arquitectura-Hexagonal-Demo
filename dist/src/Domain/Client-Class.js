"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientClass = void 0;
class ClientClass {
    constructor(name, surname, email, telephone, dni, observations, type) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.telephone = telephone;
        this.dni = dni;
        this.observations = observations;
        this.type = type;
    }
    getName() {
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    getEmail() {
        return this.email;
    }
    getTelephone() {
        return this.telephone;
    }
    getDni() {
        return this.dni;
    }
    getObservations() {
        return this.observations;
    }
    getType() {
        return this.type;
    }
    setName(name) {
        this.name = name;
    }
    setSurname(surname) {
        this.surname = surname;
    }
    setEmail(email) {
        this.email = email;
    }
    setTelephone(telephone) {
        this.telephone = telephone;
    }
    setDni(dni) {
        this.dni = dni;
    }
    setObservations(observations) {
        this.observations = observations;
    }
    setType(type) {
        this.type = type;
    }
    toString() {
        return `Client: ${this.name} ${this.surname} ${this.email} ${this.telephone} ${this.dni} ${this.observations} ${this.type}`;
    }
    setCreatedAt(date) {
        this.createdAt = date;
    }
    setUpdatedAt(date) {
        this.updatedAt = date;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
exports.ClientClass = ClientClass;
