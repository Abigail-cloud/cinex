"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cinema_controller_1 = require("../controller/cinema.controller");
const cinemaController = new cinema_controller_1.CinemaController();
const cinemaRouter = (0, express_1.Router)();
cinemaRouter.post('/book', cinemaController.bookTickets.bind(cinemaController));
exports.default = cinemaRouter;
