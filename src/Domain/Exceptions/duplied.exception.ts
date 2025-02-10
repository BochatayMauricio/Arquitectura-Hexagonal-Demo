export class DupliedException extends Error {
    public status: number = 400;
    constructor(message:string) {
        super(message);
        this.name = 'DupliedException';
    }
}