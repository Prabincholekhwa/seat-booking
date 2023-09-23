'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
