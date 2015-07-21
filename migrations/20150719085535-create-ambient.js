'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Ambients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            device: {
                allowNull: false,
                type: Sequelize.STRING(20)
            },
            type: {
                allowNull: false,
                type: Sequelize.CHAR(1)
            },
            value: {
                allowNull: false,
                type: Sequelize.NUMERIC(9, 8)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Ambients');
    }
};
