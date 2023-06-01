import { Router } from "express";
import  {OpenAPI} from 'openapi-types';
import { CinemaController } from "../controller/cinema.controller";


const cinemaController = new CinemaController();
const cinemaRouter = Router();


/**
 * @openapi
 * /cinema/book:
 *   post:
 *     summary: Create booking Tickets for users
 *     description: Create Tickets based on the available seats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Invalid request data
 */
cinemaRouter.post('/book', cinemaController.bookTickets.bind(cinemaController));



export default cinemaRouter;