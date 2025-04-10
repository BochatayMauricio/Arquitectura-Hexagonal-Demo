export class NotFoundException extends Error {
    public status: number = 404;
    constructor(message:string) {
        super(message);
        this.name = 'NotFoundException';
    }
}