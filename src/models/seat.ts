import * as Sequelize from "sequelize";
import { SeatModelInterface } from "../interfaces";
import { Database } from "./instance";
const sequelize = Database.sequelize;
import Booking from "./booking";

const Seat = sequelize.define<SeatModelInterface>(
  "seats",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    vehicleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "vehicle_id",
    },
    uniqueCode: {
        type: Sequelize.STRING(20),
      allowNull: false,
      field: "unique_code",
    },
    seatType:{
        type:Sequelize.STRING(10),
        allowNull:false,
        field:"seat_type"
    },
    status: {
      type: Sequelize.ENUM("Available","Booked", "Reserved"),
      defaultValue:"Available",
      allowNull: false,
      field: "status",
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

Booking.belongsTo(Seat, {
  foreignKey: "seatId",
  as: "seats"
})

Seat.hasMany(Booking, {
  foreignKey: "seatId",
  as: "bookings"
})


export default Seat;
