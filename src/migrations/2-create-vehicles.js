'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('vehicles', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "categories",
                    key: "id",
                }
            },
            added_by:{
                type:Sequelize.INTEGER,
                allowNull: false,
                references:{
                    model:"users",
                    key:"id"
                }
            },
            reg_no: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
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
        await queryInterface.dropTable('vehicles');
    }
};
