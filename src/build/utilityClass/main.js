"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Main {
    generateBookingId() {
        const ticketId = (0, uuid_1.v4)();
        return ticketId;
    }
}
exports.default = Main;
