import * as Sequelize from "sequelize";
import { UserModelInterface } from "../interfaces";
import { Database } from "./instance";
import Vehicle from "./vehicle";
import Booking from "./booking";

const sequelize = Database.sequelize;

const User = sequelize.define<UserModelInterface>(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "full_name",
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field:"email",
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING(15),
        allowNull: false,
        field: "phone_number",
      },
      password: {
        type: Sequelize.STRING(70),
        allowNull: false,
        field: "password"
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: "is_verified",
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );


  Booking.belongsTo(User,{
    foreignKey:"passengerId",
    as:"user"
  }),
  
  User.hasMany(Booking,{
    foreignKey:"passengerId",
    as:"bookings"
  })


  Vehicle.belongsTo(User,{
    foreignKey:"addedBy",
    as:"user"
  })

  User.hasMany(Vehicle,{
    foreignKey:"addedBy",
    as: "vehicles"
  })

export default User;
