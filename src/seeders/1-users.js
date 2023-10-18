"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: -1,
          email: "prabincholekhwa@gmail.com",
          full_name:"Prabin Cholekhwa",
          phone_number:"9761751097",
          password:"$2b$10$Zs7smDYgWuWPDFNbR92/Eeigzeit9Aee5KZGEIteVey1RhbM03l4S",
          is_verified: false,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
