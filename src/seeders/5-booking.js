"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "bookings",
      [
        {
          id: -1,
          passenger_id: -1,
          seat_id: -1,
          vehicle_id: 1,
          booking_status:"Confirmed",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: -2,
          passenger_id: -1,
          seat_id: -2,
          vehicle_id: 1,
          booking_status:"Confirmed",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: -3,
          passenger_id: -1,
          seat_id: -48,
          vehicle_id: 2,
          booking_status:"Pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: -4,
          passenger_id: -1,
          seat_id: -49,
          vehicle_id: 2,
          booking_status:"Pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};
