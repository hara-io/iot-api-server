var constant = require('../config/constants').ambient;

module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Ambients', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            deviceId: {
              allowNull: false,
              type: Sequelize.INTEGER,
              model: 'Device', // <<< Note, its table's name, not object name
              key: 'id' // <<< Note, its a column name
            },
            type: {
                allowNull: false,
                type: Sequelize.ENUM,
                values: [constant.sound, constant.light]
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
