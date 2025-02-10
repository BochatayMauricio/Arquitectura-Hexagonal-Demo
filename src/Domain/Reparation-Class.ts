import { IReparation } from "./Interfaces/IReparation";

export class ReparationClass implements IReparation{
    id?: number;
    idVehicle: number;
    description: string;
    status: string;
    retired_date?: Date;
    time_reparation: number;
    created_at?: Date;
    updated_at?: Date;
    total_amount: number;
    methodPayment: String;

    constructor(idVehicle: number, description: string){
        this.idVehicle = idVehicle;
        this.description = description;
        this.status = "Pendiente";
        this.total_amount = 0;
        this.methodPayment = "Efectivo";
        this.time_reparation = 0;
    }

    public setId(id: number): void{
        this.id = id;
    }

    public setCreatedAt(date: Date): void{
        this.created_at = date;
    }

    public setUpdatedAt(date: Date): void{
        this.updated_at = date;
    }

    public getId(): number{
        if(this.id == undefined){
            return 0;
        }
        return this.id;
    }

    public getIdVehicle(): number{
        return this.idVehicle;
    }

    public getDescription(): string{
        return this.description;
    }

    public getStatus(): string{
        return this.status;
    }

    public getRetiredDate(): Date | null{
        if(this.retired_date == undefined){
            return null;
        }
        return this.retired_date;
    }

    public getTimeReparation(): number{
        return this.time_reparation;
    }

    public getTotalAmount(): number{
        return this.total_amount;
    }

    public getMethodPayment(): String{
        return this.methodPayment;
    }

    public getCreatedAt(): Date{
        if(this.created_at == undefined){
            return new Date();
        }
        return this.created_at;
    }

    public getUpdatedAt(): Date{
        if(this.updated_at == undefined){
            return new Date();
        }
        return this.updated_at;
    }

    public setStatus(status: string): void{
        this.status = status;
    }

    public setRetiredDate(date: Date): void{
        this.retired_date = date;
    }

    public setTimeReparation(time: number): void{
        this.time_reparation = time;
    }

    public setTotalAmount(amount: number): void{
        this.total_amount = amount;
    }

    public setMethodPayment(method: String): void{
        this.methodPayment = method;
    }

    public setDescription(description: string): void{
        this.description = description;
    }

    public setIdVehicle(idVehicle: number): void{
        this.idVehicle = idVehicle;
    }

    
}