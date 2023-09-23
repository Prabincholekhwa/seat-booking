import { InputBookingInterface, BookingInterface } from "../interfaces";
import { BaseRepository } from "./baseRepository";
import Model from "../models";

export class BookingRepository extends BaseRepository<
InputBookingInterface,
BookingInterface
> {
  constructor() {
    super(Model.Booking);
  }
}
