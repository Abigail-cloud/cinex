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
exports.CinemaService = void 0;
const async_mutex_1 = require("async-mutex");
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = __importDefault(require("../utilityClass/main"));
const cinema_repo_1 = __importDefault(require("../repository/cinema.repo"));
const enums_options_1 = require("../utilityClass/enums.options");
dotenv_1.default.config();
class CinemaService {
    constructor(maxCapacity) {
        this.utility = new main_1.default();
        this.cinemaRepository = new cinema_repo_1.default();
        this.MAX_CAPACITY = maxCapacity;
        this.semaphore = new async_mutex_1.Semaphore(maxCapacity);
    }
    bookTickets(ticketPayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookingId = this.utility.generateBookingId();
            const currentBookingCount = yield this.cinemaRepository.countBooking();
            const availableSeats = this.calculateAvailableSeats(currentBookingCount);
            if (availableSeats <= 0) {
                throw new Error('No available seats');
            }
            if (ticketPayload.requestedSeats > availableSeats) {
                throw new Error('Requested number of seats exceeds available seats');
            }
            const showtime = this.calculateShowtime(ticketPayload);
            const booking = yield this.createBooking(ticketPayload, bookingId, availableSeats, showtime);
            this.semaphore.release();
            return { booking, bookingId };
        });
    }
    calculateAvailableSeats(currentBookingCount) {
        let availableSeats;
        if (currentBookingCount > 0) {
            availableSeats = this.MAX_CAPACITY - currentBookingCount;
        }
        else {
            availableSeats = this.MAX_CAPACITY;
        }
        return availableSeats;
    }
    createBooking(ticketPayload, bookingId, availableSeats, showtime) {
        return __awaiter(this, void 0, void 0, function* () {
            if (availableSeats === 0 || ticketPayload.requestedSeats > availableSeats) {
                throw new Error('No available seats');
            }
            const hallNumberOptions = 2 || 4;
            const priceOptions = 10 || 13 || 14 || 20;
            const movieTitleOptions = "a" || "b";
            let status = enums_options_1.BookingStatus.Available;
            if (availableSeats < ticketPayload.requestedSeats) {
                status = enums_options_1.BookingStatus.NotAvailable;
            }
            return this.cinemaRepository.createBooking({
                seats: ticketPayload.requestedSeats,
                hallNumber: hallNumberOptions,
                price: priceOptions,
                screen: ticketPayload.screenName,
                showtime,
                movieTitle: movieTitleOptions,
                bookingId: bookingId,
                status: status
            });
        });
    }
    calculateShowtime(ticketPayload) {
        const { hallNumber, price, movieTitle, screenName } = ticketPayload;
        let showtime = '';
        if (screenName === enums_options_1.ScreenOptions.Screen1) {
            if (hallNumber === 2 && price === 10 && movieTitle === 'a') {
                showtime = '10:00 AM';
            }
            else if (hallNumber === 4 && price === 13 && movieTitle === 'b') {
                showtime = '1:00 PM';
            }
        }
        else if (screenName === enums_options_1.ScreenOptions.Screen2) {
            if (hallNumber === 2 && price === 14 && movieTitle === 'a') {
                showtime = '3:00 PM';
            }
            else if (hallNumber === 4 && price === 20 && movieTitle === 'b') {
                showtime = '6:00 PM';
            }
        }
        if (!showtime) {
            throw new Error('The provided ticket details do not match any available showtimes.');
        }
        return showtime;
    }
}
exports.CinemaService = CinemaService;
