"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Bus",
          id: 1,
          row:10,
          column:4,
          description: "Good Bus",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
            name: "Microbus",
            id: 2,
            row:3,
            column:3,
            description: "Good Microbus",
            created_at: new Date(),
            updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
