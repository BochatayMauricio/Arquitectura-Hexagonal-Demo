export interface IReparation {
    id?: Number;
    idVehicle: Number;
    description: String;
    status: String;
    retired_date?: Date;
    time_reparation: number;
    total_amount: number;
    methodPayment: String;
    createdAt?: Date;
    updatedAt?: Date;
}
