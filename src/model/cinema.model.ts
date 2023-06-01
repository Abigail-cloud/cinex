import mongoose, { Schema } from "mongoose";
import {  TicketBooking } from "../Interface/cinema.interface";


const BookingSchema = new Schema<TicketBooking>({
    screen: { type: String, required: true },
    seats: { type: Number, required: true },
    showtime: { type: String, required: true },
    price: { type: Number, required: true },
    status:{ type: String, required: true },
    movieTitle: { type: String, required: true },
    hallNumber: { type: Number, required: true },
    bookingId: {type: String}
  });

//  { enum: ["available", "booked"], default: "available"}
export const BookedTickets= mongoose.model<TicketBooking>('BookTicket', BookingSchema)