import * as Sequelize from "sequelize";
import {
  ModelTimestampExtend,
  PaginationOrderSearchExtend,
} from "..";

export interface InputBookingInterface {
  seatId: number;
  bookingStatus: string;
}

export interface BookingInterface extends ModelTimestampExtend {
  id: Sequelize.CreationOptional<number>;
  passengerId: number;
  vehicleId:number;
  seatId: number;
  bookingStatus: string;
}

export interface BookingModelInterface
  extends Sequelize.Model<BookingInterface, Partial<InputBookingInterface>>,
    BookingInterface {}

export interface ArgsBookingInterface extends PaginationOrderSearchExtend {
  order: string;
  passengerId:number;
  seatId:number;
  vehicleId:number;
  bookingStatus: string;
}
