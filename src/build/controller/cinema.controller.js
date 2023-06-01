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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemaController = void 0;
const cinema_service_1 = require("../service/cinema.service");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = __importDefault(require("../utilityClass/logger"));
class CinemaController {
    constructor() {
        this.cinemaService = new cinema_service_1.CinemaService(4);
    }
    bookTickets(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const TicketBooking = {
                screenName: req.body.screenName,
                requestedSeats: req.body.requestedSeats,
                showtime: req.body.showtime,
                price: req.body.price,
                movieTitle: req.body.movieTitle,
                hallNumber: req.body.hallNumber,
                status: req.body.status,
                bookingId: ""
            };
            try {
                const { booking, bookingId } = yield this.cinemaService.bookTickets(TicketBooking);
                logger_1.default.info({ booking });
                res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ bookingId, message: 'Tickets booked successfully.' });
            }
            catch (error) {
                logger_1.default.info(error);
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while processing the request.' });
            }
        });
    }
}
exports.CinemaController = CinemaController;
