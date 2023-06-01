
import { ScreenOptions } from "../utilityClass/enums.options";




export interface TicketBooking  {
screen: ScreenOptions;
  seats: number;
  bookingId: string;
  showtime: string;
  price: number;
  status: string;
  movieTitle: string;
  hallNumber: number;
}
