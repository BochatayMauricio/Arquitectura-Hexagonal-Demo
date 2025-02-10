import { IClient } from "./Interfaces/IClient";

export class ClientClass implements IClient {
    id?: Number | undefined;   
    name: String;
    surname: String;
    email: String;
    telephone: String;
    dni: String;
    observations: String;
    type: String;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(name:String, surname:String, email:String, telephone:String, dni:String, observations:String, type:String) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.telephone = telephone;
        this.dni = dni;
        this.observations = observations;
        this.type = type;
    }

    public getName(): String {
        return this.name;
    }

    public getSurname(): String {
        return this.surname;
    }

    public getEmail(): String {
        return this.email;
    }

    public getTelephone(): String {
        return this.telephone;
    }

    public getDni(): String {
        return this.dni;
    }

    public getObservations(): String {
        return this.observations;
    }

    public getType(): String {
        return this.type;
    }

    public setName(name: String): void {
        this.name = name;
    }

    public setSurname(surname: String): void {
        this.surname = surname;
    }

    public setEmail(email: String): void {
        this.email = email;
    }

    public setTelephone(telephone: String): void {
        this.telephone = telephone;
    }

    public setDni(dni: String): void {
        this.dni = dni;
    }

    public setObservations(observations: String): void {
        this.observations = observations;
    }

    public setType(type: String): void {
        this.type = type;
    }

    public toString(): String {
        return `Client: ${this.name} ${this.surname} ${this.email} ${this.telephone} ${this.dni} ${this.observations} ${this.type}`;
    }

    public setCreatedAt(date: Date): void {
        this.createdAt = date;
    }

    public setUpdatedAt(date: Date): void {
        this.updatedAt = date;
    }

    public getCreatedAt(): Date|undefined {
        return this.createdAt;
    }

    public getUpdatedAt(): Date|undefined {
        return this.updatedAt;
    }

    public getId(): Number|undefined {
        return this.id;
    }

    public setId(id: Number): void {
        this.id = id;
    }
}