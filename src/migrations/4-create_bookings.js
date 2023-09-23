'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            passenger_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                }
            },
            seat_id:{
                type:Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "seats",
                    key: "id",
                }
            },
            vehicle_id:{
                type:Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "vehicles",
                    key: "id",
                }
            },
            booking_status: {
                type: Sequelize.ENUM("Confirmed", "Pending", "Cancelled"),
                defaultValue:"Pending",
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
        await queryInterface.dropTable('bookings');
    }
};
