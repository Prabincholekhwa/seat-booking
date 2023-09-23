import * as Sequelize from "sequelize";
import { BookingModelInterface } from "../interfaces";
import { Database } from "./instance";
const sequelize = Database.sequelize;
import Vehicle from "./vehicle";

const Booking = sequelize.define<BookingModelInterface>(
  "bookings",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    passengerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "passenger_id",
    },
    seatId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "seat_id",
    },

    vehicleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "vehicle_id",
    },
    bookingStatus: {
      type: Sequelize.ENUM("Confirmed", "Pending", "Cancelled"),
      defaultValue: "Pending",
      allowNull: false,
      field: "booking_status",
    },

  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);





export default Booking;
