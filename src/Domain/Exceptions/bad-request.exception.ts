export class BadRequest extends Error {
    status = 400;
    constructor(message:string) {
        super(message);
        this.name = 'BadRequest';
    }
}