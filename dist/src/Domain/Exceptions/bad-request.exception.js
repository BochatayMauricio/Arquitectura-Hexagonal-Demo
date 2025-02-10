"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.name = 'BadRequest';
    }
}
exports.BadRequest = BadRequest;
