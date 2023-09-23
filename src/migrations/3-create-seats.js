'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('seats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            vehicle_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "vehicles",
                    key: "id",
                }
            },
            unique_code:{
                type:Sequelize.STRING(20),
                allowNull: false,
            },

            seat_type:{
                type: Sequelize.STRING(10),
                allowNull:false
            },
            status: {
                type: Sequelize.ENUM("Available","Booked","Reserved"),
                defaultValue:"Available",
                allowNull: false
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
        await queryInterface.dropTable('seats');
    }
};
