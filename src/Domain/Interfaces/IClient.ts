export interface IClient {
    id?: Number;
    name: String;
    surname: String;
    email: String;
    telephone: String;
    dni: String;
    observations?: String;
    type: String;
    createdAt?: Date;
    updatedAt?: Date;

     getName(): String;

     getSurname(): String

     getEmail(): String 

     getTelephone(): String 

     getDni(): String 

     getObservations(): String 

     getType(): String 

     setName(name: String): void 

     setSurname(surname: String): void 

     setEmail(email: String): void 

     setTelephone(telephone: String): void

     setDni(dni: String): void 

     setObservations(observations: String): void 

     setType(type: String): void 

     toString(): String 

     setCreatedAt(date: Date): void 

     setUpdatedAt(date: Date): void 

     getCreatedAt(): Date|undefined

     getUpdatedAt(): Date|undefined 

     getId(): Number|undefined 

     setId(id: Number): void 
}
