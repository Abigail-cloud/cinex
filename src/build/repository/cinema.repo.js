"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cinema_model_1 = require("../model/cinema.model");
class CinemaRepository {
    createBooking(booking) {
        return __awaiter(this, void 0, void 0, function* () {
            return cinema_model_1.BookedTickets.create(booking);
        });
    }
    countBooking() {
        return __awaiter(this, void 0, void 0, function* () {
            const bookedTickets = yield cinema_model_1.BookedTickets.find({ status: "available" }).lean();
            const totalBookedSeats = bookedTickets.reduce((sum, ticket) => sum + ticket.seats, 0);
            return totalBookedSeats;
        });
    }
}
exports.default = CinemaRepository;
