"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DupliedException = void 0;
class DupliedException extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.name = 'DupliedException';
    }
}
exports.DupliedException = DupliedException;
