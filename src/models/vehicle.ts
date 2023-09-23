import * as Sequelize from "sequelize";
import { VehicleModelInterface } from "../interfaces";
import { Database } from "./instance";
const sequelize = Database.sequelize;
import Booking from "./booking";
import Seat from "./seat";


const Vehicle = sequelize.define<VehicleModelInterface>(
  "vehicles",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: "category_id",
    },
    regNo: {
      type: Sequelize.STRING(20),
      allowNull: false,
      field: "reg_no",
      unique: true
    },
  addedBy:{
    type: Sequelize.INTEGER,
    allowNull: false,
    field: "added_by",
  }
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
  }
);

Booking.belongsTo(Vehicle,{
  foreignKey:"vehicleId",
  as:"vehicle"
})

Vehicle.hasMany(Booking,{
  foreignKey:"vehicleId",
  as:"bookings"
})



Seat.belongsTo(Vehicle,{
  foreignKey:"vehicleId",
  as:"vehicle"
})
Vehicle.hasMany(Seat,{
  foreignKey:"vehicleId",
  as:"seats"
});

export default Vehicle;
