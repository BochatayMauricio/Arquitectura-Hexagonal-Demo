import { IVehicle } from "./Interfaces/IVehicle";

export class VehicleClass implements IVehicle {
     id?: Number;   
     idClient: Number;
     brand: String;
     model: String;
     year: Number;
     color: String;
     patent: String;
     createdAt?: Date;
     updatedAt?: Date;

    constructor(idClient:Number, brand:String, model:String, year:Number, color:string,patent:String) {
        this.idClient = idClient;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.patent = patent;
    }

    public setId(id: Number): void {
        this.id = id;
    }

    public getIdClient(): Number {
        return this.idClient;
    }

    public getBrand(): String {
        return this.brand;
    }

    public getModel(): String {
        return this.model;
    }

    public getYear(): Number {
        return this.year;
    }

    public getColor(): String {
        return this.color;
    }

    public getPatent(): String {
        return this.patent;
    }

    public setIdClient(idClient: Number): void {
        this.idClient = idClient;
    }

   public setDateUpdate(date: Date): void {
        this.updatedAt = date;
    }

}