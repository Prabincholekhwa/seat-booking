"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "vehicles",
      [
        {
          id: 1,
          category_id: 1,
          added_by: 1,
          reg_no: "BA2 KHA 56",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          category_id: 2,
          added_by: 1,
          reg_no: "BA5 KHA 101",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vehicles", null, {});
  },
};
